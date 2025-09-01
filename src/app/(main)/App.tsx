"use client";

import FooterMobile from "@/components/FooterMobile";
import HeaderDesktop from "@/components/HeaderDesktop";
import HeaderMobile from "@/components/HeaderMobile";
import Keyboard from "@/components/Keyboard";
import CartProvider from "@/context/cart";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useScreenType } from "@/hooks/useScreenType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { usePush } from "@/context/push";
import Push from "@/components/Push";
import PrefsProvider from "@/context/prefs";
import { QueryParamProvider } from "use-query-params";
import NextAdapterApp from "next-query-params/app";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function App({ children }: { children?: React.ReactNode }) {
  const { isTablet, isMobile } = useScreenType();
  const { toggleKeyboard, showKeyboard } = useKeyboard();
  const { showPush } = usePush();

  return (
    <div id="app">
      <Suspense>
        <QueryParamProvider adapter={NextAdapterApp}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider>
              <CartProvider>
                <PrefsProvider>
                  <div className="content">
                    {isTablet || isMobile ? (
                      <HeaderMobile />
                    ) : (
                      <HeaderDesktop onToggleKeyboard={toggleKeyboard} />
                    )}
                    <main>{children}</main>
                    {showKeyboard && (
                      <Keyboard isKeyboardOpened={showKeyboard} />
                    )}
                  </div>
                  {(isTablet || isMobile) && <FooterMobile />}
                  {showPush && <Push />}
                </PrefsProvider>
              </CartProvider>
            </SessionProvider>
          </QueryClientProvider>
        </QueryParamProvider>
      </Suspense>
    </div>
  );
}
