"use client";

import { createContext, useContext, useState } from "react";

type SecPageContextType = {
  isOpen: boolean;
  setIsOpen: (_open: boolean) => void;
};

const SecPageContext = createContext<SecPageContextType>(
  {} as SecPageContextType
);

export default function SecPageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SecPageContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SecPageContext.Provider>
  );
}

export function useSecPage() {
  return useContext(SecPageContext);
}
