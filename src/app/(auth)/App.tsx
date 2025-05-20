"use client";

import { ReactNode, useEffect } from "react";

export default function App({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.classList.add("open-sans");
  }, []);

  return (
    <main className="auth">
      <div>
        <div className="auth__logo-wrapper">
          <img alt="Logo do acessiweb" src="/img/logo-horizontal-purple.png" />
        </div>
        {children}
      </div>
    </main>
  );
}
