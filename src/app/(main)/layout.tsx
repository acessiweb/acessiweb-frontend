import App from "./App";
import PushProvider from "@/context/push";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acessiweb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PushProvider>
      <App>{children}</App>
    </PushProvider>
  );
}
