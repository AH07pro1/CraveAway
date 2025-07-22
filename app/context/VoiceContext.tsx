// VoiceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Speech from 'expo-speech';

type VoiceContextType = {
  selectedVoice: Speech.Voice | null;
  setSelectedVoice: (voice: Speech.Voice) => void;
};

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | null>(null);

  return (
    <VoiceContext.Provider value={{ selectedVoice, setSelectedVoice }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = (): VoiceContextType => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};
