# GenCraft Client (Frontend)

GenCraft is an AI-powered creative content platform. This directory contains the frontend application built with React, Vite, Tailwind CSS, and Clerk Authentication.

---

## 🛠️ Prerequisites & Setup

### 1. Installation

To install all required dependencies, run:

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the `client` directory with the following environment variables:

```env
# Clerk Authentication Publishable Key
VITE_CLERK_PUBLISHABLE_KEY=

# Backend API Base URL
VITE_BASE_URL=
```

### Environment Variable Descriptions

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk Publishable Key used for user authentication on the frontend. | `pk_test_...` |
| `VITE_BASE_URL` | Base URL of the backend Express server. | `http://localhost:3000` |

---

## 🚀 Available Commands

In the `client` directory, you can run the following commands:

### Development Mode (Run Command)
Starts the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build (Build Command)
Bundles the application for production into the `dist` directory:
```bash
npm run build
```

### Preview Production Build
Locally preview the production build output:
```bash
npm run preview
```

### Linting
Runs ESLint to check code quality:
```bash
npm run lint
```
