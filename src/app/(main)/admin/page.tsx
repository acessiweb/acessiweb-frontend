"use client";

import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope } from "react-icons/sl";
import { CardLink } from "@/components/card-link";
import { useScreenType } from "@/hooks/useScreenType";
import Guidelines from "./diretrizes/guidelines";

function HomeMobile() {
  return (
    <div className="homepage-mobile">
      <CardLink
        mainText="Diretrizes de acessibilidade"
        readRoute="/admin/diretrizes"
      >
        <PiPersonArmsSpreadLight aria-hidden={true} focusable={false} />
      </CardLink>
      <CardLink mainText="Solicitações" readRoute="/admin/solicitacoes">
        <SlEnvolope aria-hidden={true} focusable={false} />
      </CardLink>
    </div>
  );
}

export default function Home() {
  const { isTablet } = useScreenType();

  if (isTablet) {
    return <HomeMobile />;
  }

  return <Guidelines />;
}
