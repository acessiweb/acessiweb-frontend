"use client";

import { isAdmin, isCommonUser } from "@/utils/authorization";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { SlArrowLeft } from "react-icons/sl";
import Profile from "@/components/nav/Profile";
import LogoImage from "@/assets/images/logo-horizontal-purple.png";
import Image from "next/image";

type BaseHeaderProps = {
  children: ReactNode;
};

function NavigateBackward() {
  const router = useRouter();

  return (
    <button
      aria-label="Voltar para página anterior"
      className="header-mobile__backward-nav btn-icon"
      onClick={() => router.back()}
    >
      <SlArrowLeft aria-hidden={true} focusable={false} />
    </button>
  );
}

function Logo() {
  return (
    <div className="header-mobile__logo-wrapper">
      <Image alt="Logo do acessiweb" src={LogoImage} />
    </div>
  );
}

function AdminHeaderMobile({ pathname }: { pathname: string }) {
  return (
    <BaseHeaderMobile>
      {pathname === "/" ? <Logo /> : <NavigateBackward />}
      <Profile />
    </BaseHeaderMobile>
  );
}

function VisitorHeaderMobile({ pathname }: { pathname: string }) {
  return (
    <BaseHeaderMobile>
      {pathname !== "/" && <NavigateBackward />}
      <Logo />
    </BaseHeaderMobile>
  );
}

function CommonUserHeaderMobile({
  pathname,
  username,
}: {
  pathname: string;
  username: string;
}) {
  return (
    <BaseHeaderMobile>
      {pathname === "/" ? (
        <span className="header-mobile__hello-user">Olá, {username}!</span>
      ) : (
        <NavigateBackward />
      )}
      {pathname !== "/" && <Logo />}
      <Profile />
    </BaseHeaderMobile>
  );
}

function BaseHeaderMobile({ children }: BaseHeaderProps) {
  return <header className="header-mobile">{children}</header>;
}

export default function HeaderMobile() {
  const pathname = usePathname();
  const { data } = useSession();

  if (data && data.user && data.user.role) {
    if (pathname.includes("admin") && isAdmin(data.user.role)) {
      return <AdminHeaderMobile pathname={pathname} />;
    }

    if (!pathname.includes("admin") && isCommonUser(data.user.role)) {
      return (
        <CommonUserHeaderMobile
          pathname={pathname}
          username={data.user.name!}
        />
      );
    }
  }

  return <VisitorHeaderMobile pathname={pathname} />;
}
