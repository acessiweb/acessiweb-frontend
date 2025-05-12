import "@/assets/css/index.css";
import App from "./App";
import PushProvider from "@/context/push";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PushProvider>
          <App>{children}</App>
        </PushProvider>
      </body>
    </html>
  );
}
