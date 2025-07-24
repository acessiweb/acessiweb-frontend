"use client";

import { Prefs } from "@/types/prefs";
import { getPreferences, savePreference } from "@/utils/storage";
import { createContext, useContext, useEffect, useState } from "react";

type PrefsContextType = {
  prefs: Prefs | undefined;
  savePref: <K extends keyof Prefs>(type: K, value: string | number) => void;
};

const PrefsContext = createContext<PrefsContextType>({} as PrefsContextType);

export default function PrefsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<Prefs | undefined>(undefined);

  useEffect(() => {
    setPrefs(getPreferences());
  }, []);

  const savePref = <K extends keyof Prefs>(type: K, value: string | number) => {
    setPrefs((oldPrefs: Prefs | undefined) => {
      if (!oldPrefs) return;

      savePreference(type, value);

      return {
        ...oldPrefs,
        [type]: value,
      };
    });
  };

  return (
    <PrefsContext.Provider value={{ prefs, savePref }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  return useContext(PrefsContext);
}
