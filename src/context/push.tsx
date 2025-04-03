"use client";

import { createContext, useContext, useState } from "react";

type PushContextType = {
  pushMsg: string;
  showPush: boolean;
  setPushMsg: (_msg: string) => void;
  setShowPush: (_show: boolean) => void;
};

const PushContext = createContext<PushContextType>({} as PushContextType);

export default function PushProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPush, setShowPush] = useState<boolean>(false);
  const [pushMsg, setPushMsg] = useState<string>("");

  return (
    <PushContext.Provider
      value={{
        pushMsg,
        setPushMsg,
        showPush,
        setShowPush,
      }}
    >
      {children}
    </PushContext.Provider>
  );
}

export function usePush() {
  return useContext(PushContext);
}
