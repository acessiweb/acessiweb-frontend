import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/index.css";
import App from "./App";
import PushProvider from "@/context/push";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acessibiweb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PushProvider>
          <App>{children}</App>
        </PushProvider>
      </body>
    </html>
  );
}
