"use client";

import Header from "@/components/header";
import Push from "@/components/push";
import AuthProvider from "@/context/auth";
import CartProvider from "@/context/cart";
import ProjectProvider from "@/context/projects";
import { usePush } from "@/context/push";

export default function App({ children }: { children?: React.ReactNode }) {
  const { showPush } = usePush();

  return (
    <div id="app">
      <AuthProvider>
        <CartProvider>
          <ProjectProvider>
            <Header />
            <main>{children}</main>
            {showPush && <Push />}
          </ProjectProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
