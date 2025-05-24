

# Setup Instructions

This guide walks through setting up and running the Angular + Express full stack project locally.

---

## Project Structure

```
ai-image-generator/
├── backend/             # Express.js API server
├── frontend/            # Angular UI
```

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-image-generator.git
cd ai-image-generator
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in the following values in your .env file:
# STABLE_HORDE_API_KEY=your_key
# GOOGLE_CLIENT_ID=your_client_id
# GOOGLE_CLIENT_SECRET=your_client_secret
# JWT_SECRET=your_jwt_secret
# CLIENT_URL=http://localhost:4200
node index.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
ng serve
```

- Your frontend will be running at `http://localhost:4200`
- Backend should be running at `http://localhost:3000`

---

## Google OAuth Setup

Go to [Google Developer Console](https://console.developers.google.com/):

- Create OAuth credentials
- Use `http://localhost:3000/auth/google/callback` as redirect URI
- Paste the `CLIENT_ID` and `CLIENT_SECRET` into your backend `.env`

---

## Done

You can now:
- Open `http://localhost:4200`
- Click "Login with Google"
- Enter a prompt and generate AI images securely

---

## Notes

- For production, replace hardcoded localhost URLs using environment variables and Angular’s environment.ts system.
- Deployment instructions are included in the main README.

