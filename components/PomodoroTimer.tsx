'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import SettingsModal from './SettingsModal';

type SessionType = 'work' | 'shortBreak' | 'longBreak';

interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  sessionType: SessionType;
  completedCycles: number;
  workSessionsCompleted: number;
}

export default function PomodoroTimer() {
  const { settings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  
  const [state, setState] = useState<TimerState>({
    minutes: settings.workDuration,
    seconds: 0,
    isRunning: false,
    sessionType: 'work',
    completedCycles: 0,
    workSessionsCompleted: 0,
  });

  // Atualiza o timer quando as configurações mudam
  useEffect(() => {
    if (!state.isRunning) {
      const duration = getDurationForSession(state.sessionType);
      setState(prev => ({
        ...prev,
        minutes: duration,
        seconds: 0,
      }));
    }
  }, [settings, state.sessionType, state.isRunning]);

  function getDurationForSession(type: SessionType): number {
    switch (type) {
      case 'work':
        return settings.workDuration;
      case 'shortBreak':
        return settings.shortBreakDuration;
      case 'longBreak':
        return settings.longBreakDuration;
    }
  }

  const playNotificationSound = useCallback(() => {
    if (!settings.soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [settings.soundEnabled]);

  const getNextSession = useCallback((currentType: SessionType, workSessions: number): SessionType => {
    if (currentType === 'work') {
      const newWorkSessions = workSessions + 1;
      if (newWorkSessions % settings.sessionsUntilLongBreak === 0) {
        return 'longBreak';
      }
      return 'shortBreak';
    }
    return 'work';
  }, [settings.sessionsUntilLongBreak]);

  const startTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resetTimer = useCallback(() => {
    const duration = getDurationForSession(state.sessionType);
    setState(prev => ({
      ...prev,
      minutes: duration,
      seconds: 0,
      isRunning: false,
    }));
  }, [state.sessionType, settings]);

  const skipSession = useCallback(() => {
    const nextType = getNextSession(state.sessionType, state.workSessionsCompleted);
    const duration = getDurationForSession(nextType);
    
    setState(prev => ({
      ...prev,
      sessionType: nextType,
      minutes: duration,
      seconds: 0,
      isRunning: false,
      workSessionsCompleted: prev.sessionType === 'work' ? prev.workSessionsCompleted + 1 : prev.workSessionsCompleted,
      completedCycles: prev.sessionType === 'longBreak' ? prev.completedCycles + 1 : prev.completedCycles,
    }));
  }, [state.sessionType, state.workSessionsCompleted, getNextSession]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.isRunning) {
      interval = setInterval(() => {
        setState(prev => {
          let newMinutes = prev.minutes;
          let newSeconds = prev.seconds - 1;

          if (newSeconds < 0) {
            newMinutes -= 1;
            newSeconds = 59;
          }

          if (newMinutes < 0) {
            playNotificationSound();
            
            const nextType = getNextSession(prev.sessionType, prev.workSessionsCompleted);
            const duration = getDurationForSession(nextType);
            
            return {
              ...prev,
              sessionType: nextType,
              minutes: duration,
              seconds: 0,
              isRunning: settings.autoStart,
              workSessionsCompleted: prev.sessionType === 'work' ? prev.workSessionsCompleted + 1 : prev.workSessionsCompleted,
              completedCycles: prev.sessionType === 'longBreak' ? prev.completedCycles + 1 : prev.completedCycles,
            };
          }

          return {
            ...prev,
            minutes: newMinutes,
            seconds: newSeconds,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isRunning, playNotificationSound, getNextSession, settings.autoStart]);

  const formatTime = (minutes: number, seconds: number): string => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getSessionLabel = (type: SessionType): string => {
    switch (type) {
      case 'work':
        return 'Tempo de Foco';
      case 'shortBreak':
        return 'Pausa Curta';
      case 'longBreak':
        return 'Pausa Longa';
    }
  };

  const getSessionColor = (type: SessionType): string => {
    switch (type) {
      case 'work':
        return 'text-red-500';
      case 'shortBreak':
        return 'text-green-500';
      case 'longBreak':
        return 'text-blue-500';
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-md w-full relative">
          {/* Botão de Configurações */}
          <button
            onClick={() => setShowSettings(true)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            aria-label="Configurações"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Pomodoro Timer</h1>
            <p className={`text-lg ${getSessionColor(state.sessionType)} font-medium`}>
              {getSessionLabel(state.sessionType)}
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 mb-8">
            <div className="text-7xl font-mono font-bold text-white text-center">
              {formatTime(state.minutes, state.seconds)}
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            {!state.isRunning ? (
              <button
                onClick={startTimer}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Iniciar
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Pausar
              </button>
            )}
            
            <button
              onClick={resetTimer}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Resetar
            </button>
            
            <button
              onClick={skipSession}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Pular
            </button>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Ciclos Completos:</span>
              <span className="text-2xl font-bold text-white">{state.completedCycles}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-300">Sessões de Trabalho:</span>
              <span className="text-xl font-semibold text-white">{state.workSessionsCompleted}</span>
            </div>
          </div>
        </div>
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}