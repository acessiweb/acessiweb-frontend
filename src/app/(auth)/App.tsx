"use client";

import { ReactNode } from "react";
import Logo from "@/assets/images/logo-horizontal.png";
import Image from "next/image";
import "react-simple-keyboard/build/css/index.css";
import Help from "@/components/nav/Help";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/navigation";
import Keyboard from "@/components/Keyboard";
import KeyboardNav from "@/components/nav/Keyboard";
import { useKeyboard } from "@/hooks/useKeyboard";

export default function App({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { showKeyboard, toggleKeyboard } = useKeyboard();
  useHotkeys("shift+h", () => router.push("/"));

  return (
    <main className="auth" id="auth">
      <Help appId="auth" />
      <div className="auth__card">
        <KeyboardNav onToggleKeyboard={toggleKeyboard} />
        <div className="auth__logo-wrapper">
          <Image alt="Logo do acessiweb" src={Logo} />
        </div>
        {children}
      </div>
      {showKeyboard && <Keyboard isKeyboardOpened={showKeyboard} />}
    </main>
  );
}
