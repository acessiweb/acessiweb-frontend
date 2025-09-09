import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "Página inicial",
};

export default function Page() {
  return <Home />;
}
