"use client";

import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope } from "react-icons/sl";
import { useScreenType } from "@/hooks/useScreenType";
import Guidelines from "../_components/Guidelines";
import Card from "@/components/Card";

function HomeMobile() {
  return (
    <div className="homepage-mobile">
      <Card
        isLink={true}
        mainText="Diretrizes de acessibilidade"
        readRoute="/admin/diretrizes"
      >
        <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
      </Card>
      <Card
        isLink={true}
        mainText="Solicitações"
        readRoute="/admin/solicitacoes"
      >
        <SlEnvolope aria-hidden={true} focusable={false} />
      </Card>
    </div>
  );
}

export default function Home() {
  const { isMobile, isTablet } = useScreenType();

  if (isMobile || isTablet) {
    return <HomeMobile />;
  }

  return <Guidelines isAdmin={true} isRequest={false} />;
}
