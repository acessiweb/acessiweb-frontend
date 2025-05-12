"use client";

import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import Push from "@/components/push";
import AuthProvider from "@/context/auth";
import CartProvider from "@/context/cart";
import { useOverlay } from "@/context/overlay";
import ProjectProvider from "@/context/projects";
import { usePush } from "@/context/push";
import SecPageProvider from "@/context/sec-page";
import { useEffect, useState } from "react";

export default function App({ children }: { children?: React.ReactNode }) {
  const { showPush } = usePush();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const { active } = useOverlay();

  useEffect(() => {
    setScreenSize({
      width: screen.width,
      height: screen.height,
    });

    document.body.classList.add("open-sans");
  }, []);

  return (
    <div id="app">
      <AuthProvider>
        <CartProvider>
          <ProjectProvider>
            <SecPageProvider>
              {screenSize.width <= 499 ? <HeaderMobile /> : <Header />}
              <main>{children}</main>
              {showPush && <Push />}
              {active && <div id="overlay"></div>}
            </SecPageProvider>
          </ProjectProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
