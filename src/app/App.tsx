"use client";

import HeaderDesktop from "@/components/header-desktop";
import HeaderMobile from "@/components/header-mobile";
import Push from "@/components/push";
import AuthProvider from "@/context/auth";
import CartProvider from "@/context/cart";
import ProjectProvider from "@/context/projects";
import { usePush } from "@/context/push";
import SecPageProvider from "@/context/sec-page";
import { useEffect, useState } from "react";

export default function App({ children }: { children?: React.ReactNode }) {
  const { showPush } = usePush();
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

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
              {screenSize.width <= 499 ? <HeaderMobile /> : <HeaderDesktop />}
              <main>{children}</main>
              {showPush && <Push />}
            </SecPageProvider>
          </ProjectProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
