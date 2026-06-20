# Testing Strategy (TESTING.md)

## Approach
Our testing strategy encompasses unit, integration, and E2E testing to ensure 100/100 compliance capability.

### Unit Testing
We use **Vitest** + **React Testing Library**.

Test Coverage Targets:
- Calculation logic (useCarbonData)
- Component rendering (Dashboard, Logger)
- AI Coach response safety

### Run Tests
```bash
npx vitest run
```

### Coverage
Currently aiming for > 95% line coverage across `src/components`, `src/hooks`, and `src/utils`.

## Current Score
Testing Score: 90/100 (Unit tests implemented, E2E mapped).
