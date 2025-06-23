"use client";

import FooterMobile from "@/components/footer-mobile";
import HeaderDesktop from "@/components/header-desktop";
import HeaderMobile from "@/components/header-mobile";
import CartProvider from "@/context/cart";
import { useScreenType } from "@/hooks/useScreenType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ children }: { children?: React.ReactNode }) {
  const { isTablet, isMobile } = useScreenType();

  useEffect(() => {
    document.body.classList.add("open-sans");
  }, []);

  return (
    <div id="app">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <CartProvider>
            <div className="content">
              {isTablet || isMobile ? <HeaderMobile /> : <HeaderDesktop />}
              <main>{children}</main>
            </div>
            {(isTablet || isMobile) && <FooterMobile />}
          </CartProvider>
        </SessionProvider>
      </QueryClientProvider>
    </div>
  );
}
