"use client";

import { isAdmin, isCommonUser } from "@/utils/authorization";
import Cart from "@/components/nav/Cart";
import Person from "@/components/nav/Person";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import Settings from "@/components/nav/Settings";
import Logout from "@/components/nav/Logout";
import Help from "@/components/nav/Help";
import { SlHome } from "react-icons/sl";

type BaseFooterProps = {
  secItem: ReactNode;
  fourthItem: ReactNode;
  fifthItem: ReactNode;
};

function AdminFooterMobile() {
  return (
    <BaseFooterMobile
      secItem={
        <Link
          href="/admin/diretrizes/cadastrar"
          className="footer-mobile__add-guideline"
          title="Cadastrar diretriz"
          aria-label="Ir para tela de cadastro de diretriz"
        >
          <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
          <span>&#43;</span>
        </Link>
      }
      fourthItem={<Settings link="/admin/config/preferencias" />}
      fifthItem={<Logout />}
    />
  );
}

function VisitorFooterMobile() {
  return (
    <BaseFooterMobile
      secItem={<Cart />}
      fourthItem={<Person />}
      fifthItem={<Settings link="/config/preferencias" />}
    />
  );
}

function CommonUserFooterMobile() {
  return (
    <BaseFooterMobile
      secItem={<Cart />}
      fourthItem={<Settings link="/config" />}
      fifthItem={<Logout />}
    />
  );
}

function BaseFooterMobile(props: BaseFooterProps) {
  return (
    <footer className="footer-mobile">
      <div>
        <Link
          className="nav__homepage"
          href="/"
          aria-label="Ir para a página inicial"
        >
          <SlHome aria-hidden={true} focusable={false} />
        </Link>
        {props.secItem}
        <Help appId="app" />
        {props.fourthItem}
        {props.fifthItem}
      </div>
    </footer>
  );
}

export default function FooterMobile() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (session && session.user && session.user.role) {
    if (pathname.includes("admin") && isAdmin(session.user.role))
      return <AdminFooterMobile />;

    if (!pathname.includes("admin") && isCommonUser(session.user.role))
      return <CommonUserFooterMobile />;
  }

  return <VisitorFooterMobile />;
}
