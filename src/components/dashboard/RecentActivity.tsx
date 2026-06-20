import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { ActivityLog } from '../../types';
import { CATEGORIES, EMISSION_OPTIONS } from '../../constants/emissions';
import { icons } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface RecentActivityProps {
  logs: ActivityLog[];
  onDeleteLog: (id: string) => void;
}

export function RecentActivity({ logs, onDeleteLog }: RecentActivityProps) {
  const recentLogs = logs.slice(0, 5);

  return (
    <Card className="shadow-2xl shadow-slate-200/50 border-slate-200/60 hover:shadow-slate-300/50 transition-shadow duration-300">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-2xl font-black text-slate-900">Recent Activity</CardTitle>
        <CardDescription className="text-base font-semibold">Your latest recorded footprints.</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8 pt-4">
        {recentLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 bg-slate-50 rounded-[1.5rem] border border-slate-100 border-dashed">
            <icons.Leaf className="mb-4 h-12 w-12 opacity-20" />
            <p className="text-sm font-bold uppercase tracking-wider">No activity logged yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentLogs.map((log) => {
              const category = CATEGORIES.find(c => c.id === log.categoryId);
              const Icon = category ? icons[category.icon as keyof typeof icons] as any : icons.Info;
              const option = EMISSION_OPTIONS[log.categoryId]?.find(o => o.id === log.activityId);
              
              return (
                <div key={log.id} className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-[#16A34A]/30 hover:bg-[#16A34A]/5 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm" 
                      style={{ backgroundColor: `${category?.color}15`, color: category?.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-slate-900 group-hover:text-[#16A34A] transition-colors">{option?.label || 'Activity'}</p>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                        {format(parseISO(log.date), 'MMM d')} • <span className="text-slate-400">{log.value} {option?.unit}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="text-right bg-slate-100 group-hover:bg-white px-3 py-1.5 rounded-xl transition-colors">
                      <p className="text-[15px] font-black text-slate-900">+{log.co2e.toFixed(1)} <span className="text-xs font-bold text-slate-500">kg</span></p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDeleteLog(log.id)}
                      className="h-9 w-9 text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all rounded-lg"
                      aria-label="Delete log"
                    >
                      <icons.Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
