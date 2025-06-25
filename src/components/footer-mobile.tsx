"use client";

import { isAdmin, isCommonUser } from "@/utils/authorization";
import Cart from "@/components/nav/cart";
import Home from "@/components/nav/home";
import Person from "@/components/nav/person";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import Settings from "@/components/nav/settings";
import Logout from "@/components/nav/logout";
import Help from "@/components/nav/help";

type BaseHeaderProps = {
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
          className="add-guideline"
          title="Cadastrar diretriz"
          aria-label="Ir para tela de cadastro de diretriz"
        >
          <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
          <span>&#43;</span>
        </Link>
      }
      fourthItem={<Settings link="/admin/config" />}
      fifthItem={<Logout />}
    />
  );
}

function VisitorFooterMobile() {
  return (
    <BaseFooterMobile
      secItem={<Cart />}
      fourthItem={<Person />}
      fifthItem={<Settings link="/config" />}
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

function BaseFooterMobile(props: BaseHeaderProps) {
  return (
    <header className="footer-mobile">
      <div>
        <Home />
        {props.secItem}
        <Help appId="app" />
        {props.fourthItem}
        {props.fifthItem}
      </div>
    </header>
  );
}

export default function FooterMobile() {
  const pathname = usePathname();
  const { data } = useSession();

  if (data && data.user && data.user.role) {
    if (pathname.includes("admin") && isAdmin(data.user.role))
      return <AdminFooterMobile />;

    if (!pathname.includes("admin") && isCommonUser(data.user.role))
      return <CommonUserFooterMobile />;
  }

  return <VisitorFooterMobile />;
}
