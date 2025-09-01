import App from "./App";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acessiweb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <App>{children}</App>;
}
