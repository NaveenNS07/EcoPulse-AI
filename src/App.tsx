/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { LogPage } from './pages/LogPage';
import { AICoachPage } from './pages/AICoachPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { CommunityPage } from './pages/CommunityPage';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
