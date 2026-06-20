import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { ActivityLog } from '../../types';
import { Lightbulb, TrendingDown, RefreshCcw } from 'lucide-react';

interface TipsProps {
  logs: ActivityLog[];
}

export function Tips({ logs }: TipsProps) {
  const recommendations = useMemo(() => {
    // Analyze logs to find biggest impact area
    const categoryTotals: Record<string, number> = {};
    logs.forEach(log => {
      categoryTotals[log.categoryId] = (categoryTotals[log.categoryId] || 0) + log.co2e;
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : null;

    const tipsList = [];

    if (topCategory === 'transportation') {
      tipsList.push({
        title: "Try carpooling or transit",
        desc: "Transportation is your highest emission source. Opting for public transit or carpooling can halve your travel footprint.",
        icon: TrendingDown,
        color: "text-blue-600",
        bg: "bg-blue-100",
        border: "border-blue-200"
      });
    } else if (topCategory === 'diet') {
      tipsList.push({
        title: "Meatless Mondays",
        desc: "Dietary emissions are high. Swapping one beef meal per week for a plant-based option saves ~7kg CO₂e.",
        icon: RefreshCcw,
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-200"
      });
    } else if (topCategory === 'energy') {
      tipsList.push({
        title: "Unplug idle electronics",
        desc: "Energy use is your largest factor. Phantom loads can account for 10% of home electricity use.",
        icon: Lightbulb,
        color: "text-amber-600",
        bg: "bg-amber-100",
        border: "border-amber-200"
      });
    } else {
      tipsList.push({
        title: "Small changes, big impact",
        desc: "You consistently track your activities! Explore switching to a green energy provider to lower your baseline footprint.",
        icon: Lightbulb,
        color: "text-[#16A34A]",
        bg: "bg-[#16A34A]/10",
        border: "border-[#16A34A]/20"
      });
    }

    // Generic tip
    tipsList.push({
      title: "Consider carbon offsetting",
      desc: "For emissions you can't eliminate, look into verified carbon offset programs that support renewable energy.",
      icon: Lightbulb,
      color: "text-slate-600",
      bg: "bg-slate-100",
      border: "border-slate-200"
    });

    return tipsList;
  }, [logs]);

  return (
    <Card className="shadow-2xl shadow-slate-200/50 border-slate-200/60 hover:shadow-slate-300/50 transition-shadow duration-300 bg-white/80">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl font-black text-slate-900">Personalized Insights</CardTitle>
        <CardDescription className="text-base font-semibold">Recommendations based on your data.</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-4">
        {recommendations.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div key={idx} className={`flex gap-5 rounded-2xl border ${tip.border} p-5 shadow-sm bg-white hover:shadow-md transition-shadow duration-300`}>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tip.bg} ${tip.color} shadow-inner`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900 mb-1">{tip.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
