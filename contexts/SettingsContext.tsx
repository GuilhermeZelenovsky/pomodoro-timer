'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface Settings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  soundEnabled: boolean;
  autoStart: boolean;
}

export interface Preset {
  name: string;
  description: string;
  settings: Settings;
}

const defaultSettings: Settings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  soundEnabled: true,
  autoStart: false,
};

export const presets: Preset[] = [
  {
    name: 'Padrão',
    description: 'Pomodoro clássico (25/5/15)',
    settings: defaultSettings,
  },
  {
    name: 'Modo Intenso',
    description: 'Sessões mais longas (45/10/20)',
    settings: {
      workDuration: 45,
      shortBreakDuration: 10,
      longBreakDuration: 20,
      sessionsUntilLongBreak: 3,
      soundEnabled: true,
      autoStart: true,
    },
  },
  {
    name: 'Modo Rápido',
    description: 'Ciclos curtos (15/3/10)',
    settings: {
      workDuration: 15,
      shortBreakDuration: 3,
      longBreakDuration: 10,
      sessionsUntilLongBreak: 4,
      soundEnabled: true,
      autoStart: false,
    },
  },
];

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<Settings>('pomodoroSettings', defaultSettings);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
}