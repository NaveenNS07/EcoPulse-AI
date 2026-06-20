import { renderHook, act } from '@testing-library/react';
import { useCarbonData } from './useCarbonData';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useCarbonData hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty logs when local storage is empty', () => {
    const { result } = renderHook(() => useCarbonData());
    expect(result.current.logs).toEqual([]);
    expect(result.current.stats.totalCurrentMonth).toBe(0);
  });

  it('should add a new log correctly', () => {
    const { result } = renderHook(() => useCarbonData());
    
    act(() => {
      result.current.addLog({
        date: new Date().toISOString(),
        categoryId: 'transportation',
        activityId: 'car_gas',
        value: 10,
        co2e: 2.3
      });
    });

    expect(result.current.logs.length).toBe(1);
    expect(result.current.logs[0].categoryId).toBe('transportation');
    expect(result.current.logs[0].co2e).toBe(2.3);
  });
});
