"use client";

import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { SlEnvolope } from "react-icons/sl";
import GuidelinesAdmin from "./diretrizes/page";
import { isTablet } from "@/common/utils/size";
import { CardLink } from "@/components/card-link";

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
  if (isTablet()) {
    return <HomeMobile />;
  }

  return <GuidelinesAdmin />;
}
