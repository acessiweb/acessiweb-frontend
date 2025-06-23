"use client";

import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope, SlFolder } from "react-icons/sl";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { isCommonUser } from "@/common/utils/authorization";
import { CardLink } from "@/components/card-link";
import { useScreenType } from "@/hooks/useScreenType";
import GuidelinesUser from "./diretrizes/page";

function HomeUserMobile() {
  return (
    <HomeBase>
      <CardLink mainText="Diretrizes de acessibilidade" readRoute="/diretrizes">
        <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
      </CardLink>
      <CardLink mainText="Meus projetos" readRoute="/projetos">
        <SlFolder aria-hidden={true} focusable={false} />
      </CardLink>
      <CardLink mainText="Minhas solicitações" readRoute="/solicitacoes">
        <SlEnvolope aria-hidden={true} focusable={false} />
      </CardLink>
    </HomeBase>
  );
}

function HomeVisitorMobile() {
  return (
    <HomeBase>
      <CardLink mainText="Diretrizes de acessibilidade" readRoute="/diretrizes">
        <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
      </CardLink>
    </HomeBase>
  );
}

function HomeBase({ children }: { children: ReactNode }) {
  return <div className="homepage-mobile">{children}</div>;
}

export default function Home() {
  const { data } = useSession();
  const { isTablet, isMobile } = useScreenType();

  if (isMobile || isTablet) {
    if (data && data.user && data.user.role && isCommonUser(data.user.role)) {
      return <HomeUserMobile />;
    }

    return <HomeVisitorMobile />;
  }

  return <GuidelinesUser />;
}
