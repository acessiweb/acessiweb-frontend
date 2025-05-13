import { usePathname } from "next/navigation";
import { SlMicrophone, SlMagnifier } from "react-icons/sl";
import { ReactNode } from "react";
import { isAdmin, isCommonUser } from "@/common/utils/authorization";
import { useSession } from "@/context/auth";
import Link from "next/link";
import Cart from "@/common/header/cart";
import Help from "@/common/header/help";
import Settings from "@/common/header/settings";
import Profile from "@/common/header/profile";
import { captureVoiceAndPrintText } from "@/common/utils/voice";

type BaseHeaderProps = {
  secNavLastItem: ReactNode;
  showHomepageLink: boolean;
  navLinks: {
    href: string;
    desc: string;
    id: string;
  }[];
  showSecHelper: boolean;
};

function AdminHeaderDesktop() {
  const navLinks = [
    {
      href: "",
      desc: "Solicitações",
      id: "requests-nav",
    },
  ];

  return (
    <BaseHeaderDesktop
      navLinks={navLinks}
      showHomepageLink={true}
      secNavLastItem={<Settings link="" />}
      showSecHelper={false}
    />
  );
}

function CommonUserHeaderDesktop() {
  const navLinks = [
    {
      href: "",
      desc: "Meus projetos",
      id: "projects-nav",
    },
    {
      href: "",
      desc: "Minhas solicitações",
      id: "requests-nav",
    },
  ];

  return (
    <BaseHeaderDesktop
      secNavLastItem={<Profile />}
      showHomepageLink={true}
      navLinks={navLinks}
      showSecHelper={true}
    />
  );
}

function VisitorHeaderDesktop() {
  return (
    <BaseHeaderDesktop
      secNavLastItem={<Settings link="" />}
      showHomepageLink={false}
      navLinks={[]}
      showSecHelper={true}
    />
  );
}

function BaseHeaderDesktop(props: BaseHeaderProps) {
  const setLinkToActive = (e: React.MouseEvent<HTMLLIElement>) => {
    const activeLink = document.querySelector(
      ".header-desktop__nav-links--active"
    );
    activeLink?.classList.remove("header-desktop__nav-links--active");
    e.currentTarget.classList.add("header-desktop__nav-links--active");
  };

  return (
    <header className="header-desktop">
      <div className="header-desktop__logo-wrapper">
        <img alt="Logo do acessiweb" src="/img/logo-horizontal-purple.png" />
      </div>
      <ul className="header-desktop__nav-links">
        {props.showHomepageLink && (
          <li
            className="header-desktop__nav-links--active"
            id="homepage-nav"
            onClick={setLinkToActive}
          >
            <Link href="/">Início</Link>
          </li>
        )}
        {props.navLinks.map((item, i) => (
          <li key={i} id={item.id} onClick={setLinkToActive}>
            <Link href={item.href}>{item.desc}</Link>
          </li>
        ))}
      </ul>
      <ul className="header-desktop__helpers">
        <li id="page-search">
          <form
            className="header-desktop__helpers__search"
            onSubmit={(e) => e.preventDefault()}
          >
            <button
              className="header-desktop__helpers__search__mic"
              type="button"
              aria-label="Pesquisar por comando de voz"
              title="Comando por voz"
              onClick={() => captureVoiceAndPrintText("input-search")}
            >
              <SlMicrophone />
            </button>
            <div className="header-desktop__helpers__search__search-input">
              <input
                type="text"
                id="input-search"
                name="input-search"
                placeholder="Pesquisar..."
              />
              <SlMagnifier aria-hidden={true} focusable={false} />
            </div>
          </form>
        </li>
        {props.showSecHelper && (
          <li id="second-helper">
            <Cart />
          </li>
        )}
        <li id="help">
          <Help />
        </li>
        <li id="last-helper">{props.secNavLastItem}</li>
      </ul>
    </header>
  );
}

export default function HeaderDesktop() {
  const pathname = usePathname();
  const { accessType } = useSession();

  if (isAdmin(accessType)) return <AdminHeaderDesktop />;

  if (!pathname.includes("admin") && isCommonUser(accessType))
    return <CommonUserHeaderDesktop />;

  return <VisitorHeaderDesktop />;
}
