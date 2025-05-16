"use client";

import GuidelinesFilters from "@/common/filters/guidelines";
import { MOBILE_SCREEN_SIZE } from "@/common/utils/var";
import CardList from "@/components/card-list";
import ControlBarMobile from "@/components/control-bar-mobile";
import Head from "@/components/head";
import { useCart } from "@/context/cart";
import { guidelinesStore } from "@/data/guidelines";
import useScreenSize from "@/hooks/useScreenSize";
import { useEffect, useState } from "react";

export default function Home() {
  const [guidelines, setGuidelines] = useState(guidelinesStore);
  const { addGuidelinesToCart } = useCart();
  const { screenSize } = useScreenSize();

  useEffect(() => {
    setGuidelines(guidelinesStore);
  }, []);

  return (
    <>
      <Head title="Página inicial - diretrizes de acessibilidade" />
      <div className="homepage">
        <h1 className="heading-1">Diretrizes de acessibilidade</h1>
        {screenSize.width <= MOBILE_SCREEN_SIZE ? (
          <ControlBarMobile />
        ) : (
          <GuidelinesFilters />
        )}

        <CardList
          data={guidelines}
          hasAdd={true}
          onAdd={addGuidelinesToCart}
          errorMsg="Ainda não existem diretrizes cadastradas"
        />
      </div>
    </>
  );
}
