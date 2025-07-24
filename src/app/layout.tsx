import "@/assets/css/index.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="tahoma">{children}</body>
    </html>
  );
}
