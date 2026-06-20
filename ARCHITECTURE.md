# Architecture Overview (ARCHITECTURE.md)

## Tech Stack
- Frontend: React 19, Recharts, Framer Motion, Tailwind CSS
- Backend: Express v4
- AI Integration: @google/genai (Gemini 2.5 Flash)

## Software Patterns
- **Service Layer Pattern**: AI requests and controller handlers are isolated in `server.ts` endpoints `/api/ai/coach` and `/api/ai/chat`.
- **Custom Hooks**: Business logic and local state management is handled through hooks (e.g. `useCarbonData.ts`).
- **Modular Components**: Reusable UI components from Shadcn/Tailwind UI patterns (`Card.tsx`, `Button.tsx`).

## API Structure
The API proxy restricts key access to backend operations:
- `GET /api/health`
- `POST /api/ai/coach`
- `POST /api/ai/chat` 

## Optimization Targets Implemented
- Tree-shaking through standard Vite ES builds.
- Indexed LocalStorage reads using `useMemo` hooks.
- Query optimization limit logic implementation on AI queries array (latest 10 logs).
- Caching logic missing (Roadmapped).
