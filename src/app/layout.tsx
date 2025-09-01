import "@/assets/css/index.css";
import PushProvider from "@/context/push";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/acessiweb.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="tahoma">
        <PushProvider>{children}</PushProvider>
      </body>
    </html>
  );
}
