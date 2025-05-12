"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type OverlayContextType = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

const OverlayContext = createContext<OverlayContextType>(
  {} as OverlayContextType
);

export default function OverlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);

  return (
    <OverlayContext.Provider
      value={{
        active,
        setActive,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  return useContext(OverlayContext);
}
