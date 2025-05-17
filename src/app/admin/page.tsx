"use client";

import { TABLET_SCREEN_SIZE } from "@/common/utils/var";
import Card from "@/components/card";
import Head from "@/components/head";
import useScreenSize from "@/hooks/useScreenSize";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope } from "react-icons/sl";
import GuidelinesAdmin from "./diretrizes/page";

function HomeMobile() {
  return (
    <>
      <Head title="Página inicial - diretrizes de acessibilidade" />
      <div className="homepage-mobile">
        <Card
          mainText="Diretrizes de acessibilidade"
          readRoute="/admin/diretrizes"
        >
          <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
        </Card>
        <Card mainText="Solicitações" readRoute="/admin/solicitacoes">
          <SlEnvolope aria-hidden={true} focusable={false} />
        </Card>
      </div>
    </>
  );
}

export default function Home() {
  const { screenSize } = useScreenSize();

  if (screenSize.width <= TABLET_SCREEN_SIZE) {
    return <HomeMobile />;
  }

  return <GuidelinesAdmin headTitle="Página Inicial" />;
}
