import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Leaf, Car, Zap, Utensils } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

export function SimulatorPage() {
  const [transportUsage, setTransportUsage] = useState(50); // % car
  const [meatConsumption, setMeatConsumption] = useState(70); // % meat
  const [renewableEnergy, setRenewableEnergy] = useState(20); // % renewable

  // Base emissions per month
  const baseTransport = 300; 
  const baseDiet = 200;
  const baseEnergy = 250;

  // Calculated emissions based on sliders
  const currentTransport = baseTransport * (transportUsage / 100) + (baseTransport * 0.2 * ((100 - transportUsage) / 100)); // assume alt transport is 20% impact
  const currentDiet = baseDiet * (meatConsumption / 100) + (baseDiet * 0.4 * ((100 - meatConsumption) / 100)); // plant based 40% impact of meat
  const currentEnergy = baseEnergy * ((100 - renewableEnergy) / 100); // renewable is 0 impact

  const currentTotal = currentTransport + currentDiet + currentEnergy;
  const originalTotal = baseTransport + baseDiet + baseEnergy;
  const savings = originalTotal - currentTotal;
  const percentSaved = (savings / originalTotal) * 100;

  const chartData = [
    { name: 'Transport', expected: baseTransport, simulated: currentTransport, color: '#3b82f6' },
    { name: 'Diet', expected: baseDiet, simulated: currentDiet, color: '#10b981' },
    { name: 'Energy', expected: baseEnergy, simulated: currentEnergy, color: '#f59e0b' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-5xl px-4 py-8 md:py-12"
    >
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] mb-3">Reduction Simulator</h1>
        <p className="text-lg text-slate-500 font-semibold tracking-wide">Adjust the sliders to see how lifestyle changes affect your footprint.</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
            <Card className="hover:shadow-2xl hover:shadow-slate-200 transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 shadow-inner">
                            <Car className="h-6 w-6" />
                        </div>
                        Transportation
                    </CardTitle>
                    <CardDescription>Percentage of travel by personal car vs public/EV.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm font-bold mb-4 uppercase tracking-wider">
                        <span className="text-slate-400">Transit/Walk</span>
                        <span className="text-[#0F172A]">{transportUsage}% Car</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={transportUsage} 
                        onChange={(e) => setTransportUsage(Number(e.target.value))}
                        className="w-full accent-blue-500 h-3 bg-slate-200 rounded-full appearance-none cursor-pointer"
                    />
                </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:shadow-slate-200 transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-green-100 text-green-600 shadow-inner">
                            <Utensils className="h-6 w-6" />
                        </div>
                        Diet
                    </CardTitle>
                    <CardDescription>Percentage of meals containing meat vs plant-based.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm font-bold mb-4 uppercase tracking-wider">
                        <span className="text-slate-400">Plant-based</span>
                        <span className="text-[#0F172A]">{meatConsumption}% Meat</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={meatConsumption} 
                        onChange={(e) => setMeatConsumption(Number(e.target.value))}
                        className="w-full accent-green-500 h-3 bg-slate-200 rounded-full appearance-none cursor-pointer"
                    />
                </CardContent>
            </Card>

            <Card className="hover:shadow-2xl hover:shadow-slate-200 transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-yellow-100 text-yellow-600 shadow-inner">
                            <Zap className="h-6 w-6" />
                        </div>
                        Home Energy
                    </CardTitle>
                    <CardDescription>Percentage of energy from renewable sources.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm font-bold mb-4 uppercase tracking-wider">
                        <span className="text-slate-400">Fossil Fuels</span>
                        <span className="text-[#0F172A]">{renewableEnergy}% Renewable</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={renewableEnergy} 
                        onChange={(e) => setRenewableEnergy(Number(e.target.value))}
                        className="w-full accent-yellow-500 h-3 bg-slate-200 rounded-full appearance-none cursor-pointer"
                    />
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card className="bg-gradient-to-br from-[#0F172A] to-slate-800 text-slate-50 shadow-2xl relative overflow-hidden border-0">
                <div className="absolute -left-10 -bottom-10 w-80 h-80 bg-[#84CC16]/20 blur-[80px] pointer-events-none"></div>
                <CardContent className="pt-12 relative z-10">
                    <div className="text-center">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#84CC16] to-[#16A34A] mb-8 shadow-lg shadow-[#16A34A]/40 ring-4 ring-white/10">
                            <Leaf className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-3 text-shadow-sm">Simulated Monthly Footprint</h3>
                        <div className="text-7xl font-black mb-8 drop-shadow-md text-white">
                            {currentTotal.toFixed(0)} <span className="text-2xl text-slate-400 font-bold tracking-normal align-middle">kg CO₂e</span>
                        </div>
                        <div className="bg-white/10 rounded-[1.5rem] p-6 text-base font-bold flex items-center justify-between backdrop-blur-md border border-white/10 shadow-inner">
                            <span className="tracking-wide text-slate-300">Potential Savings:</span>
                            <span className="font-black text-[#84CC16] text-xl">-{savings.toFixed(0)} kg <span className="opacity-80">({percentSaved.toFixed(0)}%)</span></span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="h-[400px] flex flex-col hover:shadow-2xl hover:shadow-slate-200 transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Impact Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barSize={40}>
                            <XAxis dataKey="name" fontSize={13} fontWeight={600} tickLine={false} axisLine={false} tick={{fill: '#64748b'}} />
                            <YAxis fontSize={13} fontWeight={600} tickLine={false} axisLine={false} tick={{fill: '#64748b'}} />
                            <Tooltip 
                                cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                                contentStyle={{ borderRadius: '16px', padding: '12px 20px', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(16px)', backgroundColor: 'rgba(255,255,255,0.95)' }}
                                itemStyle={{ fontWeight: 'bold' }}
                            />
                            <Bar dataKey="simulated" name="Simulated (kg)" radius={[6, 6, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </motion.div>
  );
}
