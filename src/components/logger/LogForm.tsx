import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import { Category, ActivityOption, ActivityLog } from '../../types';
import { CATEGORIES, EMISSION_OPTIONS } from '../../constants/emissions';
import { icons } from 'lucide-react';

interface LogFormProps {
  onAddLog: (log: Omit<ActivityLog, 'id'>) => void;
}

export function LogForm({ onAddLog }: LogFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const currentOptions = useMemo(() => {
    if (!selectedCategory) return [];
    return EMISSION_OPTIONS[selectedCategory as Category] || [];
  }, [selectedCategory]);

  const activeOption = useMemo(() => {
    return currentOptions.find(opt => opt.id === selectedActivity);
  }, [currentOptions, selectedActivity]);

  const handleCategorySelect = (categoryId: Category) => {
    setSelectedCategory(categoryId);
    setSelectedActivity('');
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedActivity || !inputValue || !activeOption) return;

    const valueNum = parseFloat(inputValue);
    if (isNaN(valueNum) || valueNum <= 0) return;

    const co2e = valueNum * activeOption.factor;

    onAddLog({
      date: new Date().toISOString(),
      categoryId: selectedCategory as Category,
      activityId: selectedActivity,
      value: valueNum,
      co2e,
    });

    // Reset
    setSelectedCategory('');
    setSelectedActivity('');
    setInputValue('');
  };

  return (
    <Card className="shadow-2xl shadow-slate-200/50 border-slate-200/60 transition-shadow duration-300 hover:shadow-slate-300/50">
      <CardHeader className="p-8">
        <CardTitle className="text-2xl font-black text-slate-900">Log Activity</CardTitle>
        <CardDescription className="text-base font-semibold">Track your actions to understand your footprint.</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="text-sm font-black text-slate-700 block uppercase tracking-wider">1. Select Category</label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CATEGORIES.map((cat) => {
                const Icon = icons[cat.icon as keyof typeof icons] as any; // suppress type warning
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex flex-col items-center gap-3 rounded-[1.5rem] border-2 p-5 transition-all duration-300 ${
                      isSelected 
                        ? 'border-[#16A34A] bg-[#16A34A]/5 text-[#16A34A] shadow-md shadow-green-500/10' 
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <Icon className={`h-8 w-8 ${isSelected ? 'scale-110' : ''} transition-transform duration-300`} />
                    <span className="text-xs font-bold uppercase tracking-wide text-center">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedCategory && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="text-sm font-black text-slate-700 block uppercase tracking-wider">2. Select Activity</label>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 px-5 py-4 text-[15px] font-semibold text-slate-800 focus:border-[#16A34A] focus:outline-none focus:ring-4 focus:ring-[#16A34A]/10 transition-all cursor-pointer hover:bg-white"
                required
              >
                <option value="" disabled>Choose an option...</option>
                {currentOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="font-medium">{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          {selectedActivity && activeOption && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="text-sm font-black text-slate-700 block uppercase tracking-wider">
                3. Amount ({activeOption.unit})
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-[1.5rem] bg-slate-50 border border-slate-100">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full sm:w-1/2 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-lg font-bold focus:border-[#16A34A] focus:outline-none focus:ring-4 focus:ring-[#16A34A]/10 transition-all"
                  placeholder={`e.g. 10`}
                  required
                />
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm w-full sm:w-auto h-full flex items-center">
                  Impact: <span className="text-[#16A34A] font-black text-lg ml-2">{inputValue ? (parseFloat(inputValue) * activeOption.factor).toFixed(1) : '0'} kg CO₂e</span>
                </div>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full py-6 text-lg tracking-wide rounded-[1.5rem]" 
            disabled={!selectedCategory || !selectedActivity || !inputValue}
          >
            Save Activity to Log
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
