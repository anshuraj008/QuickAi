import express from 'express';
import { generateArticle, generateBlogTitle, generateImage } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';

const airouter = express.Router();

airouter.post('/generate-article', auth, generateArticle);
airouter.post('/generate-blog-title', auth, generateBlogTitle);
airouter.post('/generate-image', auth, generateImage);
// airouter.post('/generate-text', auth, generateText);
// airouter.post('/remove-object', auth, removeObject);

export default airouter;