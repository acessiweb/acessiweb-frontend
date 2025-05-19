"use client";

import { isTablet } from "@/common/utils/size";
import FooterMobile from "@/components/footer-mobile";
import HeaderDesktop from "@/components/header-desktop";
import HeaderMobile from "@/components/header-mobile";
import AuthProvider from "@/context/auth";
import CartProvider from "@/context/cart";
import ProjectProvider from "@/context/projects";
import { useEffect } from "react";

export default function App({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("open-sans");
  }, []);

  return (
    <div id="app">
      <AuthProvider>
        <CartProvider>
          <ProjectProvider>
            <div className="content">
              {isTablet() ? <HeaderMobile /> : <HeaderDesktop />}
              <main>{children}</main>
            </div>
            {isTablet() && <FooterMobile />}
          </ProjectProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
