import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


// Generate article from text prompt
export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length} = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({ success: false, message: 'Free usage limit exceeded. Please upgrade to premium plan.'});
        }

        // Convert length to approximate word count and tokens
        const wordCount = length === 'short' ? '300-500' : length === 'medium' ? '800-1200' : '1500-2000';
        const maxTokens = length === 'short' ? 700 : length === 'medium' ? 1600 : 2500;
        
        const enhancedPrompt = `${prompt}\n\nPlease write a comprehensive, detailed article of approximately ${wordCount} words. Make sure to cover the topic thoroughly with well-developed paragraphs, examples, and insights.`;

        const response = await AI.chat.completions.create({
        model: "gemini-2.5-flash-lite",
          messages: [
           {
             role: "user",
             content: enhancedPrompt,
            },
            ],
            temperature: 0.7,
            max_tokens: maxTokens,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, type, prompt, content) VALUES (${userId}, 'article', ${prompt}, ${content})`;
        
        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_usage: free_usage + 1 }
            });
        }

        res.json({ success: true, content });
        
    } catch (error) {
        console.log(error);
        if (error.status === 429) {
            return res.json({ success: false, message: 'API rate limit reached. Please wait a moment and try again.'});
        }
        res.json({ success: false, message: error.message || 'Failed to generate article'});
    }
}


// Generate blog title from text prompt
export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if(plan !== 'premium' && free_usage >= 10){
            return res.json({ success: false, message: 'Free usage limit exceeded. Please upgrade to premium plan.'});
        }

        const enhancedPrompt = `${prompt}

        Generate 5 creative and engaging blog titles. Include different styles: questions, how-to guides, listicles, and attention-grabbing headlines. Number them 1-5.`;

        const response = await AI.chat.completions.create({
        model: "gemini-2.5-flash-lite",
          messages: [{ role: "user", content: enhancedPrompt,}],
            temperature: 0.8,
            max_tokens: 300,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, type, prompt, content) VALUES (${userId}, 'blog-title', ${prompt}, ${content})`;
        
        if(plan !== 'premium'){
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_usage: free_usage + 1 }
            });
        }

        res.json({ success: true, content });
        
    } catch (error) {
        console.log(error);
        if (error.status === 429) {
            return res.json({ success: false, message: 'API rate limit reached. Please wait a moment and try again.'});
        }
        res.json({ success: false, message: error.message || 'Failed to generate titles'});
    }
}

// Generate image from text prompt
export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is available for premium users only. Please upgrade to premium plan."});
        }

        const formData = new FormData()
        formData.append('prompt', prompt);
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: 'arraybuffer',
        });
        
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        const {secure_url} = await cloudinary.uploader.upload(base64Image)

        await sql`INSERT INTO creations (user_id, type, prompt, content, publish) VALUES (${userId}, 'image', ${prompt}, ${secure_url}, ${publish ?? false})`;
        
        res.json({ success: true, content: secure_url });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});
    }
}

// Remove image background
export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is available for premium users only. Please upgrade to premium plan."});
        }

        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [{ effect: 'background_removal' }]
        })

        // Clean up uploaded file
        if (fs.existsSync(image.path)) {
            fs.unlinkSync(image.path);
        }

        await sql`INSERT INTO creations (user_id, type, prompt, content) VALUES (${userId}, 'image', 'Remove background from image', ${secure_url})`;
        
        res.json({ success: true, content: secure_url });
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});
    }
}

// Remove object from image
export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is available for premium users only. Please upgrade to premium plan."});
        }

        const uploadResult = await cloudinary.uploader.upload(image.path)

        // Split objects by comma or space and trim
        const objects = object.split(/[,;]/).map(obj => obj.trim()).filter(obj => obj);
        
        // If no commas, treat spaces as separate objects
        const objectsToRemove = objects.length > 1 ? objects : object.split(' ').map(obj => obj.trim()).filter(obj => obj);
        
        // Create transformation array for multiple objects
        const transformations = objectsToRemove.map(obj => ({
            effect: `gen_remove:prompt_${obj}`
        }));

        const imageUrl = cloudinary.url(uploadResult.public_id, {
            transformation: transformations,
            secure: true
        })

        // Clean up uploaded file
        if (fs.existsSync(image.path)) {
            fs.unlinkSync(image.path);
        }

        await sql`INSERT INTO creations (user_id, type, prompt, content) VALUES (${userId}, 'image', ${`Remove ${object} from image`}, ${imageUrl})`;
        
        res.json({ success: true, content: imageUrl });
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});
    }
}

// Resume review pdf only
export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is available for premium users only. Please upgrade to premium plan."});
        }

        if(resume.size > 5 * 1024 * 1024){
            return res.json({ success: false, message: "File size exceeds the 5MB limit."});
        }

        // Use pdf-parse-fork which has better ES module support
        const pdfParse = (await import('pdf-parse-fork')).default;
        
        const dataBuffer = fs.readFileSync(resume.path);
        const pdfData = await pdfParse(dataBuffer);
        
        // Clean up uploaded file
        if (fs.existsSync(resume.path)) {
            fs.unlinkSync(resume.path);
        }

        const prompt = `You are an expert resume reviewer and career advisor. Analyze the following resume and provide comprehensive, actionable feedback.

Your review should include:

1. **Overall Impression**: Brief summary of the resume's current state
2. **Strengths**: What the candidate does well (formatting, experience, skills)
3. **Areas for Improvement**: Specific weaknesses and what needs work
4. **Content Analysis**:
   - Is the professional summary/objective compelling?
   - Are achievements quantified with metrics?
   - Is the experience described with action verbs and impact?
   - Are skills relevant and properly showcased?
5. **Formatting & Structure**: Layout, readability, and organization
6. **ATS Compatibility**: Keywords and formatting for applicant tracking systems
7. **Actionable Recommendations**: Specific steps to improve the resume

Resume Content:
${pdfData.text}

Provide your analysis in a well-structured, professional format using markdown.`

        const response = await AI.chat.completions.create({
         model: "gemini-2.5-flash-lite",
          messages: [{ role: "user", content: prompt,}],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;
        
        res.json({ success: true, content});
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});
    }
}