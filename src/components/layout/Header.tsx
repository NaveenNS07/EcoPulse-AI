import React from 'react';
import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-5xl items-center px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-900">EcoTrack</span>
        </div>
      </div>
    </header>
  );
}
