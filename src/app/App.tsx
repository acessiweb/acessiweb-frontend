"use client";

import { TABLET_SCREEN_SIZE } from "@/common/utils/var";
import FooterMobile from "@/components/footer-mobile";
import HeaderDesktop from "@/components/header-desktop";
import HeaderMobile from "@/components/header-mobile";
import Push from "@/components/push";
import AuthProvider from "@/context/auth";
import CartProvider from "@/context/cart";
import ProjectProvider from "@/context/projects";
import { usePush } from "@/context/push";
import SecPageProvider from "@/context/sec-page";
import useScreenSize from "@/hooks/useScreenSize";
import { useEffect } from "react";

export default function App({ children }: { children?: React.ReactNode }) {
  const { showPush } = usePush();
  const { screenSize } = useScreenSize();

  useEffect(() => {
    document.body.classList.add("open-sans");
  }, []);

  return (
    <div id="app">
      <AuthProvider>
        <CartProvider>
          <ProjectProvider>
            <SecPageProvider>
              <div className="content">
                {screenSize.width <= TABLET_SCREEN_SIZE ? (
                  <HeaderMobile />
                ) : (
                  <HeaderDesktop />
                )}
                <main>{children}</main>
              </div>
              {screenSize.width <= TABLET_SCREEN_SIZE && <FooterMobile />}
              {showPush && <Push />}
            </SecPageProvider>
          </ProjectProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
