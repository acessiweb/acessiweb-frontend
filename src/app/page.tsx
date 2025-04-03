"use client";

import CardList from "@/components/card-list";
import { useCart } from "@/context/cart";
import { guidelinesStore } from "@/data/guidelines";
import { useEffect, useState } from "react";

export default function Home() {
  const [guidelines, setGuidelines] = useState(guidelinesStore);
  const { addGuidelinesToCart } = useCart();

  useEffect(() => {
    setGuidelines(guidelinesStore);
  }, []);

  return (
    <div className="homepage">
      <div>
        <h1 className="heading-1">Diretrizes de acessibilidade</h1>
      </div>
      <CardList
        data={guidelines}
        hasAdd={true}
        onAdd={addGuidelinesToCart}
        errorMsg="Ainda não existem diretrizes cadastradas"
      />
    </div>
  );
}
