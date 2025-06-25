"use client";

import { ReactNode, useEffect, useState } from "react";
import Logo from "@/assets/images/logo-horizontal-purple.png";
import Image from "next/image";
import { CiKeyboard } from "react-icons/ci";
import "react-simple-keyboard/build/css/index.css";
import Help from "@/components/nav/help";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";
import Keyboard from "@/components/keyboard";

export default function App({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [showKeyboard, setShowKeyboard] = useState(false);
  useHotkeys("shift+h", () => router.push("/"));
  useHotkeys("T", () => setShowKeyboard((prev) => !prev));

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
      {showKeyboard && <Keyboard showKeyboard={showKeyboard} />}
    </main>
  );
}
