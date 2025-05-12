import "@/assets/css/index.css";
import App from "./App";
import PushProvider from "@/context/push";
import OverlayProvider from "@/context/overlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OverlayProvider>
          <PushProvider>
            <App>{children}</App>
          </PushProvider>
        </OverlayProvider>
      </body>
    </html>
  );
}
