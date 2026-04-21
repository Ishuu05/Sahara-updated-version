import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, HeartHandshake, Loader2, Wifi, WifiOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { chatWithGemini } from '../../services/geminiService';
import { findOfflineAnswer } from '../../services/offlineChatbot';
import { clsx } from 'clsx';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isOffline?: boolean;
}

export const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const isOnline = useOnlineStatus();
  const scrollRef = useRef<HTMLDivElement>(null);

  const chips = [
    "What to do in a flood?",
    "Find nearest shelter",
    "How to purify water",
    "Someone is injured",
    "Earthquake safety",
  ];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'model',
        text: "Namaste! I am Sahara AI, your emergency assistant. How can I help you stay safe today?",
        timestamp: new Date()
      }]);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      // Build history for Gemini
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const responseText = await chatWithGemini(text, history);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
        isOffline: !isOnline
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // This should ideally not be hit as chatWithGemini catches and returns offline answer
      // But adding a safety fallback just in case
      const responseText = findOfflineAnswer(text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
        isOffline: true
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-bg flex flex-col pb-16">
      {/* Header */}
      <header className="bg-surface px-6 pt-12 pb-4 border-b border-border flex justify-between items-center sticky top-0 z-[1001]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
             <HeartHandshake className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="font-display text-xl font-black text-text">Sahara AI</h1>
             <div className="flex items-center gap-1.5 uppercase text-[8px] font-black tracking-widest leading-none mt-0.5">
               <div className={clsx("w-1.5 h-1.5 rounded-full", isOnline ? "bg-safe animate-pulse" : "bg-warning")} />
               <span className={isOnline ? "text-safe" : "text-warning"}>{isOnline ? "Online — Gemini Pro" : "Offline Mode"}</span>
             </div>
          </div>
        </div>
        <button onClick={() => setMessages([])} className="text-text-secondary p-2"><X size={20} /></button>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={clsx(
              "flex w-full",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div className={clsx(
              "max-w-[90%] p-5 rounded-3xl text-sm font-medium leading-relaxed drop-shadow-sm",
              msg.role === 'user' 
                ? "bg-primary text-white rounded-tr-none" 
                : "bg-surface text-text rounded-tl-none border border-border"
            )}>
              <div className="markdown-body prose prose-sm max-w-none">
                <Markdown>{msg.text}</Markdown>
              </div>
              <div className={clsx(
                "text-[9px] mt-2 font-bold opacity-60 uppercase flex items-center gap-1",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}>
                {msg.isOffline && <WifiOff size={8} />}
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-surface border border-border p-4 rounded-3xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-surface p-4 border-t border-border sticky bottom-16 z-[1001]">
        {/* Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-2 mt-[-40px]">
           {chips.map(chip => (
             <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="bg-white/80 backdrop-blur-md border border-border px-4 py-2 rounded-2xl text-xs font-bold text-text-secondary whitespace-nowrap shadow-sm active:scale-95"
             >
               {chip}
             </button>
           ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask Sahara AI anything..."
            className="w-full h-14 bg-bg border border-border rounded-2xl pl-4 pr-14 font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-all active:scale-90"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
