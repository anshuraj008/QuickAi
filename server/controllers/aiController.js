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
        model: "gemini-2.5-flash",
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
        console.log(error.message);
        res.json({ success: false, message: error.message});
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

        const response = await AI.chat.completions.create({
        model: "gemini-2.5-flash",
          messages: [{ role: "user", content: prompt,}],
            temperature: 0.7,
            max_tokens: 100,
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
        console.log(error.message);
        res.json({ success: false, message: error.message});
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
        const { image } = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is available for premium users only. Please upgrade to premium plan."});
        }

        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [{ effect: 'remove_background', background_removal: 'remove_the_background'}]
        })

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
        const { image } = req.file;
        const plan = req.plan;

        if(plan !== 'premium'){
            return res.json({ success: false, message: "This feature is available for premium users only. Please upgrade to premium plan."});
        }

        const {public_id} = await cloudinary.uploader.upload(image.path)

        const imageUrl = cloudinary.url(public_id, {
            transformation: [
                { effect: `gen_remove:${object}`}],
            resources_type: 'image'
        })

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

        const pdf = (await import('pdf-parse')).default;
        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review my resume and suggest improvements. Here is the content of my resume:\n\n${pdfData.text}`

        const response = await AI.chat.completions.create({
         model: "gemini-2.5-flash",
          messages: [{ role: "user", content: prompt,}],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content = response.choices[0].message.content;

        await sql`INSERT INTO creations (user_id, type, prompt, content) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;
        
        res.json({ success: true, content});
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message});
    }
}