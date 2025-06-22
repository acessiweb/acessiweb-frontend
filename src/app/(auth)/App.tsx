"use client";

import { ReactNode, useEffect } from "react";
import Logo from "@/assets/images/logo-horizontal-purple.png";
import Image from "next/image";
import useKeyboard from "@/hooks/useKeyboard";
import { CiKeyboard } from "react-icons/ci";
import "react-simple-keyboard/build/css/index.css";
import Help from "@/common/nav/help";

export default function App({ children }: { children: ReactNode }) {
  const { keyboard: Keyboard, setShowKeyboard } = useKeyboard();

  useEffect(() => {
    document.body.classList.add("open-sans");
  }, []);

  return (
    <main className="auth" id="auth">
      <Help appId="auth" />
      <div className="auth__card">
        <button
          className="auth__keyboard-icon"
          onClick={() => setShowKeyboard((prev) => !prev)}
          aria-label="Alternar teclado virtual"
          title="Pressione a tecla T"
          aria-keyshortcuts="T"
        >
          <CiKeyboard aria-hidden={true} focusable={false} />
        </button>
        <div className="auth__logo-wrapper">
          <Image alt="Logo do acessiweb" src={Logo} />
        </div>
        {children}
      </div>
      <Keyboard />
    </main>
  );
}
