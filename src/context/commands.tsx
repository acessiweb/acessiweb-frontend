"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type KeycutsType = {
  [x: string]: string[];
};

type CommandsContextType = {
  keycuts: KeycutsType;
  setKeycuts: Dispatch<SetStateAction<KeycutsType>>;
};

const CommandsContext = createContext<CommandsContextType>(
  {} as CommandsContextType
);

export default function CommandsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keycuts, setKeycuts] = useState<KeycutsType>({} as KeycutsType);

  return (
    <CommandsContext.Provider value={{ keycuts, setKeycuts }}>
      {children}
    </CommandsContext.Provider>
  );
}

export function useCommands() {
  return useContext(CommandsContext);
}
