import React from 'react';
import { useCarbonData } from '../hooks/useCarbonData';
import { LogForm } from '../components/logger/LogForm';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { motion } from 'framer-motion';

export function LogPage() {
  const { logs, addLog, deleteLog } = useCarbonData();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto max-w-5xl px-4 py-8 md:py-12"
    >
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] mb-3">Carbon Calculator</h1>
        <p className="text-lg text-slate-500 font-semibold tracking-wide">Log your daily activities to understand their environmental impact.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-10">
          <LogForm onAddLog={addLog} />
        </div>
        <div className="space-y-10">
          <RecentActivity logs={logs} onDeleteLog={deleteLog} />
        </div>
      </div>
    </motion.div>
  );
}
