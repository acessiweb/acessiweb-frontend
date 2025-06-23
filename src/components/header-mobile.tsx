"use client";

import { isAdmin, isCommonUser } from "@/common/utils/authorization";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { SlArrowLeft } from "react-icons/sl";
import Profile from "@/common/nav/profile";
import LogoImage from "@/assets/images/logo-horizontal-purple.png";
import Image from "next/image";

type BaseHeaderProps = {
  firstItem: ReactNode;
  secItem?: ReactNode;
  thirdItem: ReactNode;
};

function NavigateBackward() {
  const router = useRouter();

  return (
    <button
      title="Voltar"
      aria-label="Voltar para página anterior"
      className="header-mobile__backward-nav btn-icon"
      onClick={() => router.back()}
    >
      <SlArrowLeft />
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
    <BaseHeaderMobile
      firstItem={pathname === "/" ? <Logo /> : <NavigateBackward />}
      thirdItem={<Profile />}
    />
  );
}

function VisitorHeaderMobile({ pathname }: { pathname: string }) {
  return (
    <BaseHeaderMobile
      firstItem={pathname === "/" ? <Logo /> : <NavigateBackward />}
      thirdItem={<Profile />}
    />
  );
}

function CommonUserHeaderMobile({
  pathname,
  username,
}: {
  pathname: string;
  username: string;
}) {
  function HelloUser() {
    return <span className="header-mobile__hello-user">Olá, {username}!</span>;
  }

  return (
    <BaseHeaderMobile
      firstItem={pathname === "/" ? <HelloUser /> : <NavigateBackward />}
      secItem={pathname !== "/" && <Logo />}
      thirdItem={<Profile />}
    />
  );
}

function BaseHeaderMobile(props: BaseHeaderProps) {
  return (
    <header className="header-mobile">
      {props.firstItem}
      {props.secItem}
      {props.thirdItem}
    </header>
  );
}

export default function HeaderMobile() {
  const pathname = usePathname();
  const { data } = useSession();

  if (data && data.user && data.user.role) {
    if (pathname.includes("admin") && isAdmin(data.user.role))
      return <AdminHeaderMobile pathname={pathname} />;

    if (!pathname.includes("admin") && isCommonUser(data.user.role))
      return (
        <CommonUserHeaderMobile
          pathname={pathname}
          username={data.user.name!}
        />
      );
  }

  return <VisitorHeaderMobile pathname={pathname} />;
}
