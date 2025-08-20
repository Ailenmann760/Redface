# RedFace Backend

Node.js + Express backend for RedFace app.

## Setup Locally
1. Copy `.env.example` to a new file called `.env` in the backend folder.
2. In `.env`, replace `<db_password>` in MONGO_URI with your actual password ("Rich.dotcom760"). The full MONGO_URI should look like:
   mongodb+srv://redfaceadmin:Rich.dotcom760@redface.zi32mp6.mongodb.net/?retryWrites=true&w=majority&appName=Redface
   - Do NOT commit .env to GitHub—it's sensitive and ignored via .gitignore.
3. Add other vars like PORT and FIREBASE_SERVICE_ACCOUNT as you set them up.
4. Run `npm install` in the backend folder.
5. Run `npm dev` to start the server locally. Check console for "MongoDB connected" to confirm the URI works.

## Deployment to Render (Hosting the Backend)
1. Log in to Render dashboard (https://dashboard.render.com).
2. Select your existing backend service (e.g., "redface-backend") or create a new one if needed (connect to your GitHub repo's backend folder).
3. Go to "Environment" tab > "Environment Variables".
4. Click "Add Variable":
   - Key: MONGO_URI
   - Value: Paste your full URI with password: mongodb+srv://redfaceadmin:Rich.dotcom760@redface.zi32mp6.mongodb.net/?retryWrites=true&w=majority&appName=Redface
   - Save. Render auto-redeploys.
5. Add other vars (e.g., PORT=5000, FIREBASE_SERVICE_ACCOUNT as stringified JSON).
6. Check deploy logs for "MongoDB connected". If errors, verify the URI (no typos, password encoded if needed—your "." in password is fine, but test).

## GitHub Integration
- Copy the above files (.gitignore, .env.example, README.md) into your GitHub repo's /backend folder (replace old ones if they exist).
- Commit and push: git add . && git commit -m "Add MongoDB URI config" && git push
- Note: .env is local-only; never push it. Use .env.example as a template for others/teammates.

Test after updates: Locally (npm dev) and on Render (via dashboard logs). If auth fails, reset password in Atlas and update. Proceed to Firebase once connected!
