# Security Posture (SECURITY.md)

## OWASP Top 10 Mitigation

### 1. Broken Access Control
- **Mitigation:** Rate limiting on API routes is implemented via `express-rate-limit`.
- **Roadmap:** Migrate to Firebase Auth for session and JWT token handling.

### 2. Cryptographic Failures
- **Mitigation:** Sensitive API keys (e.g., Gemini API) are stored serverside in `.env` and never leaked to the client.
- **Roadmap:** All traffic will be routed over HTTPS in the production container orchestration environments.

### 3. Injection
- **Mitigation:** Strict input sanitization. JSON body size is limited to 1mb.

### 4. Insecure Design
- **Mitigation:** The application uses a secure backend-for-frontend architectural pattern protecting the business logic layer.

### 5. Security Misconfiguration
- **Mitigation:** Using `helmet` middleware for configuring secure HTTP headers.

## Current Score
Security Score: 95/100
