import Link from "next/link";
import { SlSettings } from "react-icons/sl";

export default function Settings({ link }: { link: string }) {
  return (
    <Link
      href={link}
      title="Configurações"
      aria-label="Ir para a tela de configurações"
      className="nav__settings"
    >
      <SlSettings aria-hidden={true} focusable={false} />
    </Link>
  );
}
