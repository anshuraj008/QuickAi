import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Use /tmp directory for Vercel serverless, uploads directory for local
const uploadDir = process.env.VERCEL === '1' ? '/tmp' : 'uploads';

// Ensure directory exists for local development
if (process.env.VERCEL !== '1' && !fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

export default upload;