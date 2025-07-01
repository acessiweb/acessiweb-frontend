"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { isAdmin, isCommonUser } from "@/common/utils/authorization";
import { useSession } from "@/context/auth";
import Link from "next/link";
import Cart from "@/common/nav/cart";
import Help from "@/common/nav/help";
import Settings from "@/common/nav/settings";
import Profile from "@/common/nav/profile";
import { BtnSearch } from "./search";

type BaseHeaderProps = {
  secNavLastItem: ReactNode;
  showHomepageLink: boolean;
  navLinks: {
    href: string;
    desc: string;
    id: string;
    isActive: boolean;
  }[];
  showSecHelper: boolean;
};

function AdminHeaderDesktop({ pathname }: { pathname: string }) {
  const navLinks = [
    {
      href: "",
      desc: "Solicitações",
      id: "requests-nav",
      isActive: pathname.includes("solicitacoes"),
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

function CommonUserHeaderDesktop({ pathname }: { pathname: string }) {
  const navLinks = [
    {
      href: "/projetos",
      desc: "Meus projetos",
      id: "projects-nav",
      isActive: pathname.includes("projetos"),
    },
    {
      href: "/solicitacoes",
      desc: "Minhas solicitações",
      id: "requests-nav",
      isActive: pathname.includes("solicitacoes"),
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
  const ACTIVE = "header-desktop__nav-links--active";

  const setLinkToActive = (e: React.MouseEvent<HTMLLIElement>) => {
    const activeLink = document.querySelector(
      ".header-desktop__nav-links--active"
    );
    activeLink?.classList.remove(ACTIVE);
    e.currentTarget.classList.add(ACTIVE);
  };

  return (
    <header className="header-desktop">
      <div className="header-desktop__logo-wrapper">
        <img alt="Logo do acessiweb" src="/img/logo-horizontal-purple.png" />
      </div>
      <ul className="header-desktop__nav-links">
        {props.showHomepageLink && (
          <li id="homepage-nav" onClick={setLinkToActive}>
            <Link href="/">Início</Link>
          </li>
        )}
        {props.navLinks.map((item, i) => (
          <li
            className={`${item.isActive && ACTIVE}`}
            key={i}
            id={item.id}
            onClick={setLinkToActive}
          >
            <Link href={item.href}>{item.desc}</Link>
          </li>
        ))}
      </ul>
      <ul className="header-desktop__helpers">
        <li id="page-search">
          <BtnSearch classname="search-header" />
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

  if (isAdmin(accessType)) return <AdminHeaderDesktop pathname={pathname} />;

  if (!pathname.includes("admin") && isCommonUser(accessType))
    return <CommonUserHeaderDesktop pathname={pathname} />;

  return <VisitorHeaderDesktop />;
}
