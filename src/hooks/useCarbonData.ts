import { useState, useEffect, useCallback, useMemo } from 'react';
import { ActivityLog } from '../types';
import { isSameMonth, parseISO } from 'date-fns';

const STORAGE_KEY = 'ecotrack_logs';

export function useCarbonData() {
  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const addLog = useCallback((log: Omit<ActivityLog, 'id'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: crypto.randomUUID(),
    };
    setLogs((prev) => [newLog, ...prev]);
  }, []);

  const deleteLog = useCallback((id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  }, []);

  const currentMonthLogs = logs.filter((log) => 
    isSameMonth(parseISO(log.date), new Date())
  );

  const totalCurrentMonth = currentMonthLogs.reduce((acc, log) => acc + log.co2e, 0);

  const previousMonthDate = new Date();
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
  const previousMonthLogs = logs.filter((log) => 
    isSameMonth(parseISO(log.date), previousMonthDate)
  );
  
  const totalPreviousMonth = previousMonthLogs.reduce((acc, log) => acc + log.co2e, 0);

  const stats = useMemo(() => ({
    totalCurrentMonth,
    totalPreviousMonth,
    target: 500, // Placeholder target e.g. 500 kg CO2e per month
  }), [totalCurrentMonth, totalPreviousMonth]);

  return {
    logs,
    addLog,
    deleteLog,
    stats
  };
}
