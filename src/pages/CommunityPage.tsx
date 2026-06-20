import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Users, Globe2, TreePine, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

export function CommunityPage() {
  const leaderboard = [
    { rank: 1, name: 'EcoWarriors College', points: 12500, reduced: 450 },
    { rank: 2, name: 'Green Tech Hub', points: 10200, reduced: 380 },
    { rank: 3, name: 'You (EcoPulse Alpha)', points: 850, reduced: 42 },
    { rank: 4, name: 'Local Community Team', points: 720, reduced: 25 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-5xl px-4 py-8 md:py-12"
    >
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-500/20 mb-4 text-blue-500 shadow-inner">
          <Globe2 className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] mb-3">
            Community Impact
        </h1>
        <p className="text-lg text-slate-500 font-semibold tracking-wide">See how your efforts combine with others locally and globally.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <Card className="bg-gradient-to-br from-[#16A34A] to-[#047857] text-white border-0 shadow-2xl shadow-green-600/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-10 text-center relative z-10">
                <TreePine className="h-48 w-48 absolute -right-12 -bottom-12 opacity-[0.08]" />
                <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-xl mb-6 border border-white/20 shadow-lg">
                  <TreePine className="h-8 w-8 text-white" />
                </div>
                <div className="text-xs font-black tracking-widest uppercase opacity-80 mb-2">Trees Saved</div>
                <div className="text-5xl font-black drop-shadow-md text-white">12,450</div>
            </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white border-0 shadow-2xl shadow-blue-500/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-10 text-center relative z-10">
                <Droplets className="h-48 w-48 absolute -right-12 -bottom-12 opacity-[0.08]" />
                <div className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-xl mb-6 border border-white/20 shadow-lg">
                  <Droplets className="h-8 w-8 text-white" />
                </div>
                <div className="text-xs font-black tracking-widest uppercase opacity-80 mb-2">Water (L)</div>
                <div className="text-5xl font-black drop-shadow-md text-white">850k</div>
            </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#0F172A] to-slate-800 text-white border-0 shadow-2xl shadow-slate-900/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-10 text-center relative z-10">
                <Users className="h-48 w-48 absolute -right-12 -bottom-12 opacity-[0.05]" />
                <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-xl mb-6 border border-white/10 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-xs font-black tracking-widest uppercase opacity-60 mb-2">Members</div>
                <div className="text-5xl font-black drop-shadow-md text-white">4,285</div>
            </CardContent>
        </Card>
      </div>

      <Card className="shadow-2xl shadow-slate-200/50 border-slate-200/60 overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/80 backdrop-blur-md rounded-t-[2rem] p-8">
            <CardTitle className="text-3xl font-black text-slate-900">Global Leaderboard</CardTitle>
            <CardDescription className="text-lg font-semibold text-slate-500">Top groups and individuals reducing their carbon footprint.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
                {leaderboard.map((item, index) => (
                    <div 
                        key={item.name} 
                        className={`flex items-center justify-between p-6 sm:px-8 transition-colors hover:bg-slate-50 \${item.name.includes('You') ? 'bg-gradient-to-r from-[#F0FDF4] to-transparent relative overflow-hidden' : ''}`}
                    >
                        {item.name.includes('You') && <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#16A34A] shadow-[0_0_10px_#16A34A]"></div>}
                        <div className="flex items-center gap-6">
                            <div className={`flex items-center justify-center font-black text-xl h-14 w-14 rounded-2xl \${
                                item.rank === 1 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-white shadow-lg shadow-yellow-500/30' :
                                item.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-lg' :
                                item.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg' : 'text-slate-400 bg-slate-100 border border-slate-200'
                            }`}>
                                #{item.rank}
                            </div>
                            <div>
                                <div className={`text-xl font-bold mb-1 \${item.name.includes('You') ? 'text-[#16A34A]' : 'text-slate-900'}`}>
                                    {item.name}
                                </div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                                    <span className="text-slate-600">{item.reduced} kg</span> CO₂e reduced
                                </div>
                            </div>
                        </div>
                        <div className="font-black text-3xl text-slate-900 bg-slate-100/80 backdrop-blur-md px-5 py-2.5 rounded-2xl hidden sm:block">
                            {item.points.toLocaleString()} <span className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1 ml-1 border-l border-slate-300">XP</span>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
