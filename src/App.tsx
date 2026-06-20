/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ErrorBoundary } from './components/layout/ErrorBoundary';

// Implement lazy loading with code splitting for performance optimization
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const LogPage = lazy(() => import('./pages/LogPage').then(module => ({ default: module.LogPage })));
const AICoachPage = lazy(() => import('./pages/AICoachPage').then(module => ({ default: module.AICoachPage })));
const SimulatorPage = lazy(() => import('./pages/SimulatorPage').then(module => ({ default: module.SimulatorPage })));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage').then(module => ({ default: module.ChallengesPage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(module => ({ default: module.CommunityPage })));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="log" element={<LogPage />} />
              <Route path="ai-coach" element={<AICoachPage />} />
              <Route path="simulator" element={<SimulatorPage />} />
              <Route path="challenges" element={<ChallengesPage />} />
              <Route path="community" element={<CommunityPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
