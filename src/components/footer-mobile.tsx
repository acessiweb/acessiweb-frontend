"use client";

import { isAdmin, isCommonUser } from "@/common/utils/authorization";
import Cart from "@/common/nav/cart";
import Home from "@/common/nav/home";
import Person from "@/common/nav/person";
import { useSession } from "@/context/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import Settings from "@/common/nav/settings";
import Logout from "@/common/nav/logout";
import Help from "@/common/nav/help";

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
          href=""
          className="add-guideline"
          title="Cadastrar diretriz"
          aria-label="Ir para tela de cadastro de diretriz"
        >
          <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
          <span>&#43;</span>
        </Link>
      }
      fourthItem={<Settings link="" />}
      fifthItem={<Logout />}
    />
  );
}

function VisitorFooterMobile() {
  return (
    <BaseFooterMobile
      secItem={<Cart />}
      fourthItem={<Person />}
      fifthItem={<Settings link="" />}
    />
  );
}

function CommonUserFooterMobile() {
  return (
    <BaseFooterMobile
      secItem={<Cart />}
      fourthItem={<Settings link="" />}
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
        <Help />
        {props.fourthItem}
        {props.fifthItem}
      </div>
    </header>
  );
}

export default function FooterMobile() {
  const pathname = usePathname();
  const { accessType } = useSession();

  if (pathname.includes("admin") && isAdmin(accessType))
    return <AdminFooterMobile />;

  if (!pathname.includes("admin") && isCommonUser(accessType))
    return <CommonUserFooterMobile />;

  return <VisitorFooterMobile />;
}
