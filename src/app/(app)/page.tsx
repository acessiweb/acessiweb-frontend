import type { Metadata } from "next";
import Home from "./homepage";

export const metadata: Metadata = {
  title: "Página inicial",
};

export default function Page() {
  return <Home />;
}
