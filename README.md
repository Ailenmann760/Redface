# RedFace

A dating app + social network (Instagram + Twitter + Tinder). Built with React, Tailwind CSS, Framer Motion, shadcn/ui, Node.js, Express, MongoDB, Firebase Auth/Storage, Socket.io.

## Features
- Auth with email/password, Google (phone omitted for MVP).
- Profile setup and editing.
- Swipe-based dating with matches.
- Social posts, likes, comments, follows, feed, explore.
- Messaging with real-time (typing, read not fully implemented).
- Notifications via sockets (basic).
- Search, block, settings.
- Dark/light mode, responsive UI with animations.

## Setup Locally
1. Clone repo.
2. Backend: `cd backend`, `npm i`, add .env, `npm dev`.
3. Frontend: `cd frontend`, `npm i`, update firebase.js, `npm dev`.

## Deployment
1. **Database (MongoDB Atlas)**:
   - Sign up at mongodb.com/atlas.
   - Create a free cluster, add IP 0.0.0.0/0 for access.
   - Get connection URI (replace password), add to backend env as MONGO_URI.

2. **Firebase**:
   - Create project at console.firebase.google.com.
   - Enable Email/Password and Google auth in Authentication.
   - Enable Storage.
   - Get web config (apiKey, etc.) for frontend/firebase.js.
   - Download service account key JSON from Project Settings > Service Accounts, stringify it, add to backend env as FIREBASE_SERVICE_ACCOUNT.

3. **Backend (Render or Heroku)**:
   - Sign up at render.com (free tier).
   - New Web Service > Build from GitHub (select backend folder if subdir, or separate repo).
   - Runtime: Node, Build Command: `npm install`, Start Command: `npm start`.
   - Add env variables: MONGO_URI, PORT=5000, FIREBASE_SERVICE_ACCOUNT.
   - Deploy. Get URL (e.g., https://redface-backend.onrender.com), update frontend proxy/api calls if needed.

4. **Frontend (Vercel)**:
   - Sign up at vercel.com (free).
   - New Project > Import GitHub repo (frontend folder).
   - Add env variables for Firebase (API_KEY, AUTH_DOMAIN, etc.).
   - Deploy. Get URL (e.g., https://redface-frontend.vercel.app).

Update frontend axios baseURL to backend deployed URL.
