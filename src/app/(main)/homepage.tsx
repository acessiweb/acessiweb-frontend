"use client";

import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope, SlFolder } from "react-icons/sl";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { isCommonUser } from "@/utils/authorization";
import { CardLink } from "@/components/card-link";
import { useScreenType } from "@/hooks/useScreenType";
import GuidelinesUser from "./diretrizes/page";

function HomeUserMobile() {
  return (
    <HomeBase>
      <CardLink mainText="Diretrizes de acessibilidade" readRoute="/diretrizes">
        <div>
          <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
        </div>
      </CardLink>
      <CardLink mainText="Meus projetos" readRoute="/projetos">
        <div>
          <SlFolder aria-hidden={true} focusable={false} />
        </div>
      </CardLink>
      <CardLink mainText="Minhas solicitações" readRoute="/solicitacoes">
        <div>
          <SlEnvolope aria-hidden={true} focusable={false} />
        </div>
      </CardLink>
    </HomeBase>
  );
}

function HomeVisitorMobile() {
  return (
    <HomeBase>
      <CardLink mainText="Diretrizes de acessibilidade" readRoute="/diretrizes">
        <div>
          <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
        </div>
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
