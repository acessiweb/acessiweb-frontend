import { useScreenType } from "@/hooks/useScreenType";
import Link from "next/link";
import { SlSettings } from "react-icons/sl";

export default function Settings({ link }: { link: string }) {
  const { isDesktop } = useScreenType();

  return (
    <Link
      href={link}
      aria-label="Ir para a tela de configurações"
      className={`nav__settings ${isDesktop && "btn-icon"} cursor-pointer`}
    >
      <SlSettings
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
    </Link>
  );
}
