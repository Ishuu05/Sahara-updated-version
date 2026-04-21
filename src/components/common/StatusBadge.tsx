import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface StatusBadgeProps {
  status: 'safe' | 'warning' | 'danger' | 'info' | 'critical' | string;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'safe':
      case 'resolved':
      case 'available':
        return {
          bg: 'bg-safe/10',
          text: 'text-safe',
          icon: <CheckCircle size={14} />,
          defaultLabel: 'Safe'
        };
      case 'warning':
      case 'medium':
      case 'low stock':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          icon: <AlertTriangle size={14} />,
          defaultLabel: 'Warning'
        };
      case 'danger':
      case 'high':
      case 'active':
        return {
          bg: 'bg-danger/10',
          text: 'text-danger',
          icon: <AlertCircle size={14} />,
          defaultLabel: 'Danger'
        };
      case 'critical':
      case 'evacuate':
        return {
          bg: 'bg-danger text-white',
          text: 'text-white',
          icon: <AlertCircle size={14} />,
          defaultLabel: 'Critical'
        };
      default:
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          icon: <Info size={14} />,
          defaultLabel: label || status
        };
    }
  };

  const config = getStyles();

  return (
    <div className={clsx(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap",
      config.bg,
      config.text
    )}>
      {config.icon}
      <span>{label || config.defaultLabel}</span>
    </div>
  );
};
