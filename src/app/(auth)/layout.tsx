import { ReactNode } from "react";

import { Metadata } from "next";
import App from "./App";

export const metadata: Metadata = {
  title: "Acessiweb",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <App>{children}</App>;
}
