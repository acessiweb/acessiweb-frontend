import { isAdmin, isCommonUser } from "@/common/utils/authorization";
import Cart from "@/common/header/cart";
import Home from "@/common/header/home";
import Person from "@/common/header/person";
import { useSession } from "@/context/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import Settings from "@/common/header/settings";
import Logout from "@/common/header/logout";
import Help from "@/common/header/help";

type BaseHeaderProps = {
  secItem: ReactNode;
  fourthItem: ReactNode;
  fifthItem: ReactNode;
};

function AdminHeaderMobile() {
  return (
    <BaseHeaderMobile
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

function VisitorHeaderMobile() {
  return (
    <BaseHeaderMobile
      secItem={<Cart />}
      fourthItem={<Person />}
      fifthItem={<Settings link="" />}
    />
  );
}

function CommonUserHeaderMobile() {
  return (
    <BaseHeaderMobile
      secItem={<Cart />}
      fourthItem={<Settings link="" />}
      fifthItem={<Logout />}
    />
  );
}

function BaseHeaderMobile(props: BaseHeaderProps) {
  return (
    <header className="header-mobile">
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

export default function HeaderMobile() {
  const pathname = usePathname();
  const { accessType } = useSession();

  if (pathname.includes("admin") && isAdmin(accessType))
    return <AdminHeaderMobile />;

  if (!pathname.includes("admin") && isCommonUser(accessType))
    return <CommonUserHeaderMobile />;

  return <VisitorHeaderMobile />;
}
