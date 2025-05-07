"use client";

import { createContext, useContext, useEffect, useState } from "react";

const sessionInitalValue = {
  accessType: "",
  username: "",
};

const AuthContext =
  createContext<typeof sessionInitalValue>(sessionInitalValue);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSession, setCurrentSession] = useState(sessionInitalValue);

  useEffect(() => {
    const cs = localStorage.getItem("acessibiweb-cs");

    const obj = { accessType: "VISITOR", username: "Laura" };

    if (!cs) {
      localStorage.setItem("acessibiweb-cs", JSON.stringify(obj));
    }

    if (cs) {
      setCurrentSession(JSON.parse(cs));
    }

    setCurrentSession(obj);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessType: currentSession.accessType,
        username: currentSession.username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  return useContext(AuthContext);
}
