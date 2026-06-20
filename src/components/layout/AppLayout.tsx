import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Leaf, LayoutDashboard, Calculator, BotMessageSquare, Activity, Trophy, Users, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Calculator & Log', href: '/log', icon: Calculator },
    { name: 'AI Coach', href: '/ai-coach', icon: BotMessageSquare },
    { name: 'Simulator', href: '/simulator', icon: Activity },
    { name: 'Challenges', href: '/challenges', icon: Trophy },
    { name: 'Community', href: '/community', icon: Users },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden text-[#0F172A] selection:bg-[#84CC16]/30 selection:text-[#0F172A] relative">
      
      {/* Dynamic Ambient Background - Glassmorphism base */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#22C55E]/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#84CC16]/10 blur-[120px] pointer-events-none"></div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-72 flex-col bg-[#0F172A] text-slate-50 md:flex z-20 relative overflow-hidden border-r border-slate-800 shadow-[20px_0_40px_rgb(0,0,0,0.1)]">
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#16A34A]/20 to-transparent pointer-events-none"></div>
        
        <div className="flex h-24 items-center gap-4 px-8 relative z-10 border-b border-white/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#84CC16] to-[#16A34A] text-white shadow-lg shadow-[#16A34A]/30">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">EcoPulse <span className="text-[#84CC16] font-bold">AI</span></span>
        </div>
        
        <nav className="flex-1 space-y-2 px-4 py-8 overflow-y-auto relative z-10">
          <div className="mb-6 px-4 text-xs font-bold uppercase tracking-widest text-slate-500">Menu</div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-4 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#16A34A]/20 to-transparent border-l-4 border-[#84CC16] text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-[#84CC16]' : 'text-slate-500 group-hover:text-white'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 relative z-10">
          <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-5 text-slate-50 flex flex-col items-start gap-3 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-white/5">
                <Sparkles className="h-24 w-24" />
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84CC16] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#84CC16]"></span>
              </span>
              <span className="text-sm font-bold tracking-wide">Tracking Active</span>
            </div>
            <p className="text-xs text-slate-400 font-medium relative z-10">AI model is analyzing your footprint.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        
        {/* Mobile Header */}
        <header className="flex h-20 w-full items-center justify-between border-b border-slate-200/50 bg-white/50 backdrop-blur-xl px-6 md:hidden z-30 relative">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#84CC16] to-[#16A34A] text-white shadow-md shadow-[#16A34A]/20">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-[#0F172A]">EcoPulse <span className="text-[#16A34A]">AI</span></span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
          </Button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute inset-0 z-20 w-full bg-[#0F172A]/95 backdrop-blur-3xl pt-20 md:hidden">
            <nav className="flex flex-col space-y-2 px-6 py-8 h-full">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-4 rounded-2xl px-6 py-5 text-lg font-bold transition-all ${
                      isActive ? 'bg-[#16A34A]/20 text-white border-l-4 border-[#84CC16]' : 'text-slate-300 border-l-4 border-transparent'
                    }`}
                  >
                    <item.icon className={`h-7 w-7 ${isActive ? 'text-[#84CC16]' : 'text-slate-500'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        <main className="flex-1 overflow-y-auto w-full scroll-smooth">
            <Outlet />
        </main>
      </div>
    </div>
  );
}
