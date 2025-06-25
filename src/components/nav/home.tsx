import Link from "next/link";
import { SlHome } from "react-icons/sl";

export default function Home() {
  return (
    <Link
      className="nav__homepage"
      href="/"
      aria-label="Ir para a página inicial"
    >
      <SlHome aria-hidden={true} focusable={false} />
    </Link>
  );
}
