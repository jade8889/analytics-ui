"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useState } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundContextProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error(
      "useSoundContext must be used within a SoundContextProvider"
    );
  }
  return context;
}
