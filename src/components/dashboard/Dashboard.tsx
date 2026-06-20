import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CarbonStats, ActivityLog } from '../../types';
import { CATEGORIES } from '../../constants/emissions';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Leaf, ArrowDownRight, ArrowUpRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  stats: CarbonStats;
  logs: ActivityLog[];
}

export function Dashboard({ stats, logs }: DashboardProps) {
  const chartData = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const total = logs
        .filter((l) => l.categoryId === cat.id)
        .reduce((sum, l) => sum + l.co2e, 0);
      return {
        name: cat.label,
        total: Number(total.toFixed(1)),
        color: cat.color,
      };
    });
  }, [logs]);

  const percentageUsed = Math.min(100, (stats.totalCurrentMonth / stats.target) * 100);
  const isOverTarget = stats.totalCurrentMonth > stats.target;
  const trend = stats.totalPreviousMonth === 0 ? 0 : ((stats.totalCurrentMonth - stats.totalPreviousMonth) / stats.totalPreviousMonth) * 100;
  const isTrendGood = trend <= 0;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <Card className="md:col-span-2 lg:col-span-1 border-0 bg-gradient-to-br from-[#16A34A] to-[#047857] text-white shadow-2xl shadow-green-600/30 relative overflow-hidden h-full">
          <div className="absolute -right-16 -top-16 text-white/10 rotate-12">
            <Leaf className="w-64 h-64" />
          </div>
          <CardHeader className="pb-4 relative z-10 border-b border-white/10">
            <CardTitle className="text-sm font-bold opacity-90 text-green-50 uppercase tracking-widest flex items-center justify-between">
              Current Footprint
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20">This Month</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 relative z-10">
            <div className="text-6xl font-black tracking-tight drop-shadow-md flex items-end gap-2 mb-2">
              {stats.totalCurrentMonth.toFixed(1)} 
              <span className="text-2xl font-bold opacity-80 text-green-100 transform -translate-y-2">kg CO₂e</span>
            </div>
            
            <div className="mt-10 space-y-4">
              <div className="flex items-center justify-between bg-black/10 rounded-[1.5rem] p-5 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl \${isTrendGood ? 'bg-[#84CC16]/30 text-[#84CC16]' : 'bg-red-400/30 text-red-200'}`}>
                    {isTrendGood ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="text-xs text-green-100 font-bold uppercase tracking-wider mb-1">vs Last Month</div>
                    <div className={`text-lg font-black \${isTrendGood ? 'text-green-200' : 'text-red-200'}`}>
                      {stats.totalPreviousMonth === 0 ? "No prior data" : `${Math.abs(trend).toFixed(1)}% \${isTrendGood ? 'Decrease' : 'Increase'}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/10 rounded-[1.5rem] p-5 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-green-100 mb-3">
                  <span className="flex items-center gap-1.5"><Target className="w-4 h-4"/> Target: {stats.target} kg</span>
                  <span className="text-base">{percentageUsed.toFixed(0)}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-black/20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentageUsed}%` }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    className={`h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] ${isOverTarget ? 'bg-red-400' : 'bg-[#84CC16]'}`}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="md:col-span-2">
        <Card className="h-full flex flex-col bg-white/80 shadow-xl border-white/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Emissions Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }} barSize={50}>
                <XAxis dataKey="name" fontSize={13} fontWeight={600} tickLine={false} axisLine={false} tick={{fill: '#64748b', dy: 10}} />
                <YAxis fontSize={13} fontWeight={600} tickLine={false} axisLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `${value}kg`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                  contentStyle={{ borderRadius: '20px', padding: '12px 20px', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(16px)', backgroundColor: 'rgba(255,255,255,0.9)' }}
                  itemStyle={{ fontWeight: '900', fontSize: '1.1rem' }}
                />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
