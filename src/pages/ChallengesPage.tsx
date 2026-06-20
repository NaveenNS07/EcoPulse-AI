import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Trophy, CheckCircle2, Circle, Flame, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CHALLENGES = [
  { id: 1, title: 'Meatless Monday', desc: 'Avoid meat for the entire day.', points: 50, category: 'Diet', completed: false },
  { id: 2, title: 'Zero Plastics', desc: 'Use reusable bags and bottles.', points: 30, category: 'Lifestyle', completed: true },
  { id: 3, title: 'Pedal Power', desc: 'Commute by bike instead of car.', points: 100, category: 'Transport', completed: false },
  { id: 4, title: 'Unplugged', desc: 'Turn off all non-essential electronics overnight.', points: 20, category: 'Energy', completed: false },
];

export function ChallengesPage() {
  const [challenges, setChallenges] = useState(CHALLENGES);

  const toggleChallenge = (id: number) => {
    setChallenges(prev => prev.map(c => 
      c.id === id ? { ...c, completed: !c.completed } : c
    ));
  };

  const totalPoints = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-4xl px-4 py-8 md:py-12"
    >
      <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div className="text-center sm:text-left">
            <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-500/20 mb-4 text-amber-500 shadow-inner">
              <Trophy className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] mb-3">
                Eco Challenges
            </h1>
            <p className="text-lg text-slate-500 font-semibold tracking-wide">Complete daily missions to earn points and level up.</p>
        </div>
        
        <div className="bg-gradient-to-br from-[#0F172A] to-slate-800 text-white rounded-[2rem] px-8 py-6 flex items-center gap-6 shadow-2xl border border-white/5 mx-auto sm:mx-0">
            <div className="flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl h-16 w-16 shadow-lg shadow-amber-500/30 ring-4 ring-white/10">
                <Flame className="h-8 w-8 text-white" />
            </div>
            <div>
                <div className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-1.5 opacity-90">Total XP</div>
                <div className="text-4xl font-black">{totalPoints} <span className="text-base font-bold text-slate-400 tracking-normal border-l border-slate-600/50 pl-3 ml-1.5 opacity-80">pts</span></div>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {challenges.map((challenge, index) => (
            <motion.div 
              key={challenge.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`transition-all duration-300 hover:shadow-xl \${challenge.completed ? 'bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-[#86EFAC] shadow-[#86EFAC]/20' : 'bg-white/80 border-slate-200/60'}`}>
                  <CardContent className="p-6 sm:p-8 flex items-center gap-6">
                      <button 
                          onClick={() => toggleChallenge(challenge.id)}
                          className="flex-shrink-0 transition-transform active:scale-90 focus:outline-none"
                      >
                          {challenge.completed ? (
                              <div className="bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full p-2.5 shadow-lg shadow-green-500/30 text-white border-2 border-white/40">
                                <CheckCircle2 className="h-7 w-7" />
                              </div>
                          ) : (
                              <div className="rounded-full p-2.5 border-2 border-transparent">
                                <Circle className="h-8 w-8 text-slate-300 hover:text-[#22C55E] transition-colors" />
                              </div>
                          )}
                      </button>
                      
                      <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2.5">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full \${challenge.completed ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-slate-100 text-slate-500'}`}>
                                  {challenge.category}
                              </span>
                              <span className="text-sm font-black text-amber-500 tracking-wide">+{challenge.points} XP</span>
                          </div>
                          <h3 className={`font-black text-2xl mb-1.5 \${challenge.completed ? 'text-[#16A34A] line-through decoration-2 decoration-[#16A34A]/40' : 'text-slate-900'}`}>
                              {challenge.title}
                          </h3>
                          <p className={`text-[15px] font-semibold \${challenge.completed ? 'text-green-700/60' : 'text-slate-500'}`}>
                              {challenge.desc}
                          </p>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-400 hover:text-slate-800" disabled={challenge.completed}>
                          <ArrowRight className="h-6 w-6" />
                      </Button>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
