"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { isAdmin, isCommonUser } from "@/utils/authorization";
import Link from "next/link";
import Cart from "@/components/nav/Cart";
import Help from "@/components/nav/Help";
import Settings from "@/components/nav/Settings";
import { BtnSearch } from "./Search";
import { useSession } from "next-auth/react";
import Logo from "../assets/images/logo-horizontal-purple.png";
import Image from "next/image";
import { HOMEPAGE_LINKS } from "@/utils/homepage-links";
import Logout from "./nav/Logout";
import KeyboardNav from "./nav/Keyboard";
import Profile from "./nav/Profile";

type BaseHeaderProps = {
  showHomepageLink: boolean;
  navLinks?: {
    href: string;
    desc: string;
    id: string;
  }[];
  logoLink: string;
  children: ReactNode;
  pathname: string;
  onToggleKeyboard: () => void;
};

function BaseHeaderDesktop({
  children,
  logoLink,
  showHomepageLink,
  navLinks,
  pathname,
  onToggleKeyboard,
}: BaseHeaderProps) {
  return (
    <header className="header-desktop">
      <Link href={logoLink}>
        <div className="header-desktop__logo-wrapper">
          <Image alt="Logo do acessiweb" src={Logo} />
        </div>
      </Link>
      <ul className="header-desktop__nav-links">
        {showHomepageLink && (
          <li
            id="homepage"
            className={
              pathname === logoLink || HOMEPAGE_LINKS.includes(pathname)
                ? "header-desktop__nav-links--active"
                : undefined
            }
          >
            <Link href={logoLink}>Início</Link>
          </li>
        )}
        {navLinks &&
          navLinks.map((item) => (
            <li
              key={item.id}
              id={`${item.id}-nav-link`}
              className={
                pathname === item.href
                  ? "header-desktop__nav-links--active"
                  : undefined
              }
            >
              <Link href={item.href}>{item.desc}</Link>
            </li>
          ))}
      </ul>
      <ul className="header-desktop__helpers">
        <li id="page-search" tabIndex={0}>
          <BtnSearch classname="search-header" />
        </li>
        <li id="help" tabIndex={0}>
          <Help appId="app" />
        </li>
        <li id="keyboard" tabIndex={0}>
          <KeyboardNav onToggleKeyboard={onToggleKeyboard} />
        </li>
        {children}
      </ul>
    </header>
  );
}

export default function HeaderDesktop({
  onToggleKeyboard,
}: {
  onToggleKeyboard: () => void;
}) {
  const pathname = usePathname();
  const { data } = useSession();

  if (data && data.user && data.user.role) {
    if (isAdmin(data.user.role))
      return (
        <BaseHeaderDesktop
          onToggleKeyboard={onToggleKeyboard}
          navLinks={[
            {
              href: "/admin/solicitacoes",
              desc: "Solicitações",
              id: "requests",
            },
          ]}
          showHomepageLink={true}
          logoLink={"/admin"}
          pathname={pathname}
        >
          <li id="settings" tabIndex={0}>
            <Settings link="/admin/config" />
          </li>
          <li id="logout" tabIndex={0}>
            <Logout />
          </li>
        </BaseHeaderDesktop>
      );

    if (!pathname.includes("admin") && isCommonUser(data.user.role))
      return (
        <BaseHeaderDesktop
          onToggleKeyboard={onToggleKeyboard}
          showHomepageLink={true}
          navLinks={[
            {
              href: "/projetos",
              desc: "Meus projetos",
              id: "projects",
            },
            {
              href: "/solicitacoes",
              desc: "Minhas solicitações",
              id: "requests",
            },
          ]}
          logoLink={"/"}
          pathname={pathname}
        >
          <li id="cart" tabIndex={0}>
            <Cart />
          </li>
          <li id="profile" tabIndex={0}>
            <Profile />
          </li>
        </BaseHeaderDesktop>
      );
  }

  return (
    <BaseHeaderDesktop
      showHomepageLink={false}
      logoLink={"/"}
      pathname={pathname}
      onToggleKeyboard={onToggleKeyboard}
    >
      <li id="cart" tabIndex={0}>
        <Cart />
      </li>
      <li id="settings" tabIndex={0}>
        <Settings link="/config" />
      </li>
      <li>
        <Link href="/auth/logar" className="btn-link-default">
          Logar
        </Link>
      </li>
      <li>
        <Link href="/auth/criar-conta" className="btn-link-default">
          Criar conta
        </Link>
      </li>
    </BaseHeaderDesktop>
  );
}
