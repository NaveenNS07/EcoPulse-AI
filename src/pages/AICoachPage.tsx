import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useCarbonData } from '../hooks/useCarbonData';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AICoachPage() {
  const { logs, stats } = useCarbonData();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi there! I'm EcoPulse AI. How can I help you reduce your carbon footprint today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch('/api/ai/coach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ logs, stats })
        });
        const data = await res.json();
        if (data.suggestions) {
            setSuggestions(data.suggestions);
        } else {
            setSuggestions([
              "Based on typical usage, try reducing car travel.",
              "Eat one more plant-based meal this week.",
              "Turn off unnecessary lights to save energy."
            ]);
        }
      } catch (e) {
        console.error("Failed to load initial suggestions", e);
        setSuggestions([
          "Based on typical usage, try reducing car travel.",
          "Eat one more plant-based meal this week.",
          "Turn off unnecessary lights to save energy."
        ]);
      }
    };
    // Fetch suggestions initially or when key external dependencies change
    fetchSuggestions();
  }, [logs, stats]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, logs, stats })
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.text || "Sorry, I couldn't generate a response." 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to EcoPulse AI server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-6xl px-4 py-8 md:py-12 h-[calc(100vh-theme(spacing.20))] flex flex-col md:h-screen"
    >
      <div className="mb-8 flex-shrink-0 text-center md:text-left">
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br from-[#84CC16]/20 to-[#16A34A]/20 mb-4 text-[#16A34A] shadow-inner shadow-green-500/10">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">AI Sustainability Coach</h1>
        <p className="text-lg text-slate-500 font-semibold tracking-wide">Get personalized advice and chat with your eco-assistant.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 flex-1 min-h-0">
        
        {/* Left Side: Personalized Action Plan */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto hidden lg:block">
            <Card className="bg-gradient-to-br from-[#0F172A] to-slate-800 text-white border-0 shadow-2xl shadow-slate-900/20 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#84CC16]/10 blur-3xl rounded-full"></div>
                <CardContent className="pt-10 relative z-10">
                    <CardTitle className="text-2xl mb-3 flex items-center gap-2 text-white">Automated Action Plan</CardTitle>
                    <p className="text-sm text-slate-400 font-semibold mb-8 tracking-wide">Based on your recent activity, EcoPulse AI suggests:</p>
                    
                    {suggestions.length === 0 ? (
                        <div className="animate-pulse space-y-5">
                            <div className="h-5 bg-white/10 rounded-lg w-3/4"></div>
                            <div className="h-5 bg-white/10 rounded-lg w-full"></div>
                            <div className="h-5 bg-white/10 rounded-lg w-5/6"></div>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {suggestions.map((sug, i) => (
                                <li key={i} className="bg-white/5 rounded-2xl p-5 text-sm font-semibold border border-white/10 shadow-sm leading-relaxed backdrop-blur-md flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-[#84CC16] to-[#16A34A] w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-[0_0_10px_#84CC16]"></div>
                                    {sug}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Right Side: Chat Interface */}
        <Card className="lg:col-span-2 flex flex-col min-h-0 bg-white/70 backdrop-blur-3xl border-white/60 shadow-2xl overflow-hidden !p-0">
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6" ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#84CC16]/20 to-[#16A34A]/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                                <Bot className="h-5 w-5 text-[#16A34A]" />
                            </div>
                        )}
                        <div className={`max-w-[85%] rounded-[2rem] px-6 py-4 shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-gradient-to-br from-[#16A34A] to-[#047857] text-white rounded-br-none shadow-md shadow-green-600/20' 
                                : 'bg-white border text-slate-800 rounded-bl-none border-white/60 shadow-xl shadow-slate-200/50'
                        }`}>
                            <div className="text-[15px] leading-relaxed font-medium prose prose-sm prose-slate max-w-none">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0 shadow-inner">
                                <User className="h-5 w-5 text-slate-600" />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-4 justify-start">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#84CC16]/20 to-[#16A34A]/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                            <Bot className="h-5 w-5 text-[#16A34A]" />
                        </div>
                        <div className="bg-white border rounded-[2rem] rounded-bl-none px-6 py-5 shadow-xl flex gap-2 items-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-bounce"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-5 md:p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100">
                <form onSubmit={handleSend} className="flex gap-3 relative max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about reducing your carbon footprint..."
                        className="flex-1 rounded-full border-2 border-slate-200 bg-white px-8 py-5 pr-20 text-[15px] font-semibold text-slate-800 placeholder:text-slate-400 focus:border-[#16A34A] focus:outline-none focus:ring-4 focus:ring-[#16A34A]/10 transition-all shadow-inner"
                    />
                    <Button 
                        type="submit" 
                        size="icon" 
                        className="absolute right-2 top-2 h-12 w-12 rounded-full bg-gradient-to-br from-[#16A34A] to-[#047857] hover:from-[#15803d] hover:to-[#065f46] text-white shadow-lg"
                        disabled={!input.trim() || isLoading}
                    >
                        <Send className="h-5 w-5 ml-1" />
                    </Button>
                </form>
            </div>
        </Card>
      </div>
    </motion.div>
  );
}
