import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  largeText: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  highContrast: false,
  largeText: false,
  toggleHighContrast: () => {},
  toggleLargeText: () => {},
});

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('sahara_high_contrast') === 'true');
  const [largeText, setLargeText] = useState(() => localStorage.getItem('sahara_large_text') === 'true');

  useEffect(() => {
    localStorage.setItem('sahara_high_contrast', String(highContrast));
    if (highContrast) document.documentElement.classList.add('high-contrast');
    else document.documentElement.classList.remove('high-contrast');
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('sahara_large_text', String(largeText));
    if (largeText) document.documentElement.classList.add('large-text');
    else document.documentElement.classList.remove('large-text');
  }, [largeText]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLargeText = () => setLargeText(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{ highContrast, largeText, toggleHighContrast, toggleLargeText }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
