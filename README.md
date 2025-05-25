

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


# API Reference & Integration Summary

## API Reference

### 1. `POST /generate-image`

**Use case:**  
Initiate image generation based on a user's text prompt using the Stable Horde API.

**Request body:**
```json
{
  "prompt": "a cyberpunk warrior standing in the rain"
}
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Response (when still processing):**
```json
{
  "status": "pending",
  "message": "Image is still being generated. Try again shortly.",
  "generatedId": "12345-abcde-uuid",
  "queuePosition": 167,
  "waitTime": 65
}
```

**Response (when ready):**
```json
{
  "status": "success",
  "image": "https://image-url",
}
```

---

### 2. `GET /image-status/:id`

**Use case:**  
Poll this endpoint to check if the generated image is ready, using the `requestId` returned earlier.

**Route params:**  
`:id` → Request ID returned from `/generate-image`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (when still processing):**
```json
{
  "status": "pending",
  "message": "Image is still being generated. Try again shortly.",
  "generatedId": "12345-abcde-uuid",
  "queuePosition": 167,
  "waitTime": 65
}
```

**Response (when ready):**
```json
{
  "status": "success",
  "image": "https://image-url",
}
```

---

### 3. `GET /auth/google`

**Use case:**  
Redirects user to Google OAuth consent screen for login.

**Effect:**  
User is redirected to Google login and then back to `/auth/google/callback`.

---

### 4. `GET /auth/google/callback`

**Use case:**  
Receives callback from Google after login and issues a JWT.

**Response (redirect):**  
Redirects user to:

```
http://<client_url>?token=<JWT>
```

---

### Third-Party APIs Used

#### 1. **Stable Horde API**

- Endpoint: `https://stablehorde.net/api/v2/generate/async`
- Use case: Generate AI images from text prompts.
- Input: `{ prompt: string }`
- Output: `{ id: string }`

- Endpoint: `https://stablehorde.net/api/v2/generate/status/${generatedId}`
- Use case: Generate AI images from text prompts.
- Output: `{ generation: [{img: string}], queue_position: number, wait_time: number }`

#### 2. **Google OAuth (via Passport.js)**

- Strategy: `passport-google-oauth20`
- Use case: Authenticate users and issue a JWT.
- Used to protect image generation endpoints.

---

## Integration Flow (High-Level)

1. Angular frontend shows a "Login with Google" button.
2. User is redirected to `/auth/google` on the Express backend.
3. After login, Google redirects to `/auth/google/callback`.
4. Backend generates a JWT and redirects to the Angular frontend with the token.
5. Frontend stores the token and includes it in requests to `/api/generate-image` and `/api/image-status/:id`.
6. Backend uses Stable Horde to generate the image and returns a request ID.
7. Angular polls the status endpoint until the image is ready.

---

## Security Considerations & Trade-Offs

### Security Measures

| Concern              | Mitigation |
|----------------------|------------|
| API Key Exposure     | Kept server-side in `.env` |
| Route Protection     | JWT-authenticated middleware |
| OAuth Tokens         | Stored and verified using `jsonwebtoken` |
| CORS                 | Restricted to trusted origin via `CLIENT_URL` |
| Input Validation     | Prompts validated before API call |
| Secrets Management   | All secrets stored in `.env`, excluded from git |
| Sessionless Auth     | JWT used instead of session for simplicity |
| Error Handling       | Graceful messaging on failures or queue delays |

### Trade-Offs

- No database used → no persistent user tracking or token blacklisting
- Token stored in localStorage → convenient, but not secure vs XSS
- No rate limiting or captcha → could be added for production use
- No HTTPS enforced locally → production must enforce HTTPS



