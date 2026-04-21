import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, MessageSquare, Newspaper, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

export const CivilianNav: React.FC = () => {
  const navItems = [
    { to: '/civilian/home', icon: Home, label: 'Home' },
    { to: '/civilian/map', icon: Map, label: 'Map' },
    { to: '/civilian/chat', icon: MessageSquare, label: 'AI Help' },
    { to: '/civilian/news', icon: Newspaper, label: 'Updates' },
    { to: '/civilian/sos', icon: ShieldAlert, label: 'SOS', isSpecial: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-4 py-2 pb-safe z-[1000] flex justify-around items-center h-16 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => clsx(
            "flex flex-col items-center justify-center p-2 rounded-xl transition-all relative",
            isActive 
              ? (item.isSpecial ? "text-danger" : "text-primary") 
              : "text-text-secondary hover:text-text"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon size={22} className={clsx(item.isSpecial && "animate-pulse")} />
              <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{item.label}</span>
              {/* Active indicator dot */}
              <div
                className={clsx(
                  "absolute -top-1 w-1 h-1 rounded-full bg-current transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
