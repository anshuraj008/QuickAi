# GenCraft Server (Backend)

GenCraft backend is an Express.js API server connected to a Neon PostgreSQL database, integrating Clerk Authentication, Google Gemini API, Clipdrop API, and Cloudinary.

---

## 🛠️ Prerequisites & Setup

### 1. Installation (Install Command)

To install all required backend dependencies, run:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the `server` directory with the following environment variables:

```env
# Database Connection URL (Neon PostgreSQL)
DATABASE_URL=

# Clerk Authentication Keys
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# AI Services API Keys
GEMINI_API_KEY=
CLIPDROP_API_KEY=

# Cloudinary Storage Configuration
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Server Port (Optional, defaults to 3000)
PORT=3000
```

### Environment Variable Descriptions

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | Neon PostgreSQL connection string for database access and credit tracking. |
| `CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key for backend authentication verification. |
| `CLERK_SECRET_KEY` | Clerk Secret Key for backend user management. |
| `GEMINI_API_KEY` | Google Gemini API Key for text, article, title, and resume processing. |
| `CLIPDROP_API_KEY` | Clipdrop API Key for background and object removal. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name for storing generated and processed images. |
| `CLOUDINARY_API_KEY` | Cloudinary API Key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret. |
| `PORT` | Local server port (defaults to `3000`). |

---

## 🚀 Available Commands

In the `server` directory, you can run the following commands:

### Development Mode (Run Command with Hot-Reload)
Starts the Express server with Nodemon (auto-restarts on file changes):
```bash
npm run server
```

### Production Mode (Run Command)
Starts the Express server using standard Node.js:
```bash
npm start
```

### Build Command
As an Express.js backend, no build/compilation step is required. The server runs directly via `npm start`.
```,Description:
