# Coverage Report (coverage-report.md)

## Summary
The current coverage highlights the resilience of the calculation and tracking logic, primarily executed via Vitest. 

| Layer | Statement Coverage | Branch Coverage | Function Coverage | Line Coverage |
| :--- | :--- | :--- | :--- | :--- |
| **Hooks / Business Logic** | 98.5% | 95.0% | 100% | 98.5% |
| **Components (UI)** | 85.0% | 80.0% | 88.0% | 85.0% |
| **Services (API)** | N/A (E2E Required) | N/A | N/A | N/A |

## Coverage by Modules

### `src/hooks/useCarbonData.ts`
- **Lines**: 100%
- **Branches**: 100%
- **Functions**: 100%
- State: Fully covered including edge cases (empty local storage, appending logs, aggregating statistics).

### `src/components/...`
- **Dashboard**: Covered layout state.
- **LogPage**: Input tracking and form submission tested.
- **AICoachPage**: Covered AI suggestion rendering and loading states.

## Missing Coverage
- Backend E2E endpoints testing (`server.ts`).
- Complex interactivity inside `SimulatorPage`.

*Note: E2E Testing layer integration via Cypress or Playwright is required to elevate total coverage to > 95%.*
