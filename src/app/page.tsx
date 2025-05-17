"use client";

import { TABLET_SCREEN_SIZE } from "@/common/utils/var";
import Head from "@/components/head";
import useScreenSize from "@/hooks/useScreenSize";
import GuidelinesUser from "./diretrizes/page";
import Card from "@/components/card";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope, SlFolder } from "react-icons/sl";
import { ReactNode } from "react";
import { useSession } from "@/context/auth";
import { isCommonUser } from "@/common/utils/authorization";

function HomeUserMobile() {
  return (
    <HomeBase>
      <Card mainText="Diretrizes de acessibilidade" readRoute="/diretrizes">
        <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
      </Card>
      <Card mainText="Meus projetos" readRoute="/projetos">
        <SlFolder aria-hidden={true} focusable={false} />
      </Card>
      <Card mainText="Minhas solicitações" readRoute="/solicitacoes">
        <SlEnvolope aria-hidden={true} focusable={false} />
      </Card>
    </HomeBase>
  );
}

function HomeVisitorMobile() {
  return (
    <HomeBase>
      <Card mainText="Diretrizes de acessibilidade" readRoute="/diretrizes">
        <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
      </Card>
    </HomeBase>
  );
}

function HomeBase({ children }: { children: ReactNode }) {
  return (
    <>
      <Head title="Página inicial" />
      <div className="homepage-mobile">{children}</div>
    </>
  );
}

export default function Home() {
  const { screenSize } = useScreenSize();
  const { accessType } = useSession();

  if (screenSize.width <= TABLET_SCREEN_SIZE) {
    if (isCommonUser(accessType)) {
      return <HomeUserMobile />;
    }

    return <HomeVisitorMobile />;
  }

  return <GuidelinesUser headTitle="Página Inicial" />;
}
