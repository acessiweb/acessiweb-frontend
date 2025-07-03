export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
