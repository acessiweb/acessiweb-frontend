"use client";

import Header from "@/components/header";
import Push from "@/components/push";
import AuthProvider from "@/context/auth";
import CartProvider from "@/context/cart";
import { usePush } from "@/context/push";

export default function App({ children }: { children: React.ReactNode }) {
  const { showPush } = usePush();

  return (
    <div id="app">
      <AuthProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
          {showPush && <Push />}
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
