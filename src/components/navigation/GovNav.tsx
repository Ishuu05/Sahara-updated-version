import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Package, Activity, ClipboardList } from 'lucide-react';
import { clsx } from 'clsx';

export const GovNav: React.FC = () => {
  const navItems = [
    { to: '/gov/home', icon: LayoutDashboard, label: 'Command' },
    { to: '/gov/map', icon: Map, label: 'GPS Ops' },
    { to: '/gov/resources', icon: Package, label: 'Logistics' },
    { to: '/gov/predictions', icon: Activity, label: 'Insights' },
    { to: '/gov/reports', icon: ClipboardList, label: 'Damage' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-4 py-2 pb-safe z-[1000] flex justify-around items-center h-16 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => clsx(
            "flex flex-col items-center justify-center p-2 rounded-xl transition-all relative",
            isActive ? "text-primary" : "text-text-secondary hover:text-text"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon size={22} />
              <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{item.label}</span>
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
