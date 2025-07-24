import "@/assets/css/index.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/acessiweb.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="tahoma">{children}</body>
    </html>
  );
}
