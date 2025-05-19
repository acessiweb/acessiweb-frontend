"use client";

import GuidelinesUser from "./diretrizes/page";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope, SlFolder } from "react-icons/sl";
import { ReactNode } from "react";
import { useSession } from "@/context/auth";
import { isCommonUser } from "@/common/utils/authorization";
import { isTablet } from "@/common/utils/size";
import { CardLink } from "@/components/card-link";

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
  const { accessType } = useSession();

  if (isTablet()) {
    if (isCommonUser(accessType)) {
      return <HomeUserMobile />;
    }

    return <HomeVisitorMobile />;
  }

  return <GuidelinesUser />;
}
