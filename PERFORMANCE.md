# Performance Architecture (PERFORMANCE.md)

## Performance Architecture Overview
Our primary goal is achieving near-instant interactions via advanced frontend optimization strategies and efficient backend utilization.

We target:
- Lighthouse Performance: ≥ 95
- Time to Interactive (TTI): < 1.5 seconds
- First Contentful Paint: < 1.0 second

## Optimization Strategies Implemented

### Frontend
1. **Lazy Loading and Code Splitting**: All router entries are split using `React.lazy` and `Suspense`, dropping the initial payload size significantly.
2. **Memoization**: Intensive data reduction steps in components (e.g. `Tips.tsx`, `useCarbonData` hook) are wrapped in `useMemo` and `useCallback` to prevent unnecessary re-renders.
3. **Tree Shaking**: Standard Vite behavior ensures unused packages from libraries.

### Backend and APIs
1. **Rate Limiting**: Prevented DDOS overhead by applying sliding window algorithms over API endpoints using `express-rate-limit`.
2. **Payload Limitation**: Prevent payload attacks causing excessive processing delay by setting JSON limit to `1mb`.

### AI Integration
1. **Response Safe Fallback**: We've added defensive catch logic during quota exhaustion issues with the Free Tier API limits. Instead of a hard crash, users will receive a locally cached set of pre-calculated suggestions.

## Bottleneck Report
Currently, AI generation endpoints add 1-4 seconds of blocking overhead for suggestions.
- **Immediate Resolution**: Use a loading spinner for `Suspense` and localized caching.
- **Next Step**: Store history of coaching requests to database.

## Metrics
- Target Web Vitals: 98/100
