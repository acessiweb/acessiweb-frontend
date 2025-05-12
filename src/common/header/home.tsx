import Link from "next/link";
import { SlHome } from "react-icons/sl";

export default function Home() {
  return (
    <Link href="/" title="Página inicial" aria-label="Ir para a página inicial">
      <SlHome aria-hidden={true} focusable={false} />
    </Link>
  );
}
