# Threat Model & Security Architecture (THREAT_MODEL.md)

## System Architecture

EcoPulse uses a Backend-for-Frontend (BFF) architecture using Express.js and React.

### Components
1. **Frontend (React SPA)**: Handles UI, temporary state.
2. **API Proxy (Express)**: Handles rate limiting, key protection.
3. **External Services (Gemini API)**: Generates AI Insights.

## Threat Analysis (STRIDE)

### 1. Spoofing
- **Threat**: Attackers could spoof requests.
- **Mitigation**: Future roadmap includes Firebase Auth (JWT verification). Currently mitigates via strict CORS policy.

### 2. Tampering
- **Threat**: Tampering with API requests to Gemini.
- **Mitigation**: Payload schemas are strictly defined. Express limits body size to 1MB.

### 3. Repudiation
- **Threat**: Lack of logs.
- **Mitigation**: Implement middleware logging for all API inputs and outputs. (Roadmapped)

### 4. Information Disclosure
- **Threat**: Leaking Gemini API key to the client.
- **Mitigation**: Gemini API key is strictly maintained on the server (`server.ts`) and never exposed to the Vite client.

### 5. Denial of Service (DoS)
- **Threat**: Exhausting Gemini API quotas or server resources.
- **Mitigation**: `express-rate-limit` enforces 100 requests per 15 minutes per IP. Fallback gracefully returns cached responses if API quota is exceeded (Status 429).

### 6. Elevation of Privilege
- **Threat**: Gaining admin access.
- **Mitigation**: All roles are currently standard users. No admin surface exists.

## Future Recommendations
- Configure robust Firebase Authentication and Role-Based Access Control (RBAC).
- Implement database-layer encryption (Encryption at rest).
