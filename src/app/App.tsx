"use client";

import { getCart, setCart } from "@/common/localStorage";
import Header from "@/components/header";
import AuthProvider from "@/context/auth";
import { getProjects, setProjects } from "@/data/projects";
import { useEffect } from "react";

export default function App({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cart = getCart();
    const projects = getProjects();

    if (!cart) {
      setCart({
        name: "",
        desc: "",
        guidelines: [],
      });
    }

    if (!projects) {
      setProjects([]);
    }
  }, []);

  return (
    <AuthProvider>
      <div id="app">
        <Header />
        <main>{children}</main>
      </div>
    </AuthProvider>
  );
}
