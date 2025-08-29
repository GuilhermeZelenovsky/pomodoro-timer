'use client';

import { useState, useEffect } from 'react';
import { Settings, presets, useSettings } from '@/contexts/SettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [tempSettings, setTempSettings] = useState<Settings>(settings);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof Settings, value: string | boolean) => {
    if (typeof value === 'string') {
      const numValue = parseInt(value) || 0;
      setTempSettings(prev => ({ ...prev, [field]: numValue }));
    } else {
      setTempSettings(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePresetSelect = (preset: Settings) => {
    setTempSettings(preset);
  };

  const handleSave = () => {
    updateSettings(tempSettings);
    onClose();
  };

  const handleReset = () => {
    resetSettings();
    setTempSettings(settings);
  };

  const validateInput = (field: keyof Settings, value: number): number => {
    const limits = {
      workDuration: { min: 15, max: 60 },
      shortBreakDuration: { min: 3, max: 15 },
      longBreakDuration: { min: 10, max: 30 },
      sessionsUntilLongBreak: { min: 2, max: 6 },
    };

    if (field in limits) {
      const { min, max } = limits[field as keyof typeof limits];
      return Math.min(Math.max(value, min), max);
    }
    return value;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Configurações</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Presets */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Presets Rápidos</h3>
          <div className="space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset.settings)}
                className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="text-white font-medium">{preset.name}</div>
                <div className="text-gray-400 text-sm">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Duração das Sessões */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Duração das Sessões</h3>
          <div className="space-y-4">
            <div>
              <label className="flex justify-between items-center">
                <span className="text-white">Tempo de Foco</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={tempSettings.workDuration}
                    onChange={(e) => handleInputChange('workDuration', e.target.value)}
                    onBlur={(e) => {
                      const validated = validateInput('workDuration', parseInt(e.target.value));
                      handleInputChange('workDuration', validated.toString());
                    }}
                    min="15"
                    max="60"
                    className="w-16 px-2 py-1 bg-gray-700 text-white rounded text-center"
                  />
                  <span className="text-gray-400">min</span>
                </div>
              </label>
            </div>

            <div>
              <label className="flex justify-between items-center">
                <span className="text-white">Pausa Curta</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={tempSettings.shortBreakDuration}
                    onChange={(e) => handleInputChange('shortBreakDuration', e.target.value)}
                    onBlur={(e) => {
                      const validated = validateInput('shortBreakDuration', parseInt(e.target.value));
                      handleInputChange('shortBreakDuration', validated.toString());
                    }}
                    min="3"
                    max="15"
                    className="w-16 px-2 py-1 bg-gray-700 text-white rounded text-center"
                  />
                  <span className="text-gray-400">min</span>
                </div>
              </label>
            </div>

            <div>
              <label className="flex justify-between items-center">
                <span className="text-white">Pausa Longa</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={tempSettings.longBreakDuration}
                    onChange={(e) => handleInputChange('longBreakDuration', e.target.value)}
                    onBlur={(e) => {
                      const validated = validateInput('longBreakDuration', parseInt(e.target.value));
                      handleInputChange('longBreakDuration', validated.toString());
                    }}
                    min="10"
                    max="30"
                    className="w-16 px-2 py-1 bg-gray-700 text-white rounded text-center"
                  />
                  <span className="text-gray-400">min</span>
                </div>
              </label>
            </div>

            <div>
              <label className="flex justify-between items-center">
                <span className="text-white">Sessões até Pausa Longa</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={tempSettings.sessionsUntilLongBreak}
                    onChange={(e) => handleInputChange('sessionsUntilLongBreak', e.target.value)}
                    onBlur={(e) => {
                      const validated = validateInput('sessionsUntilLongBreak', parseInt(e.target.value));
                      handleInputChange('sessionsUntilLongBreak', validated.toString());
                    }}
                    min="2"
                    max="6"
                    className="w-16 px-2 py-1 bg-gray-700 text-white rounded text-center"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Preferências */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Preferências</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Som de Notificação</span>
              <input
                type="checkbox"
                checked={tempSettings.soundEnabled}
                onChange={(e) => handleInputChange('soundEnabled', e.target.checked)}
                className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-white">Auto-iniciar Próxima Sessão</span>
              <input
                type="checkbox"
                checked={tempSettings.autoStart}
                onChange={(e) => handleInputChange('autoStart', e.target.checked)}
                className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
            </label>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Salvar
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Restaurar Padrão
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}