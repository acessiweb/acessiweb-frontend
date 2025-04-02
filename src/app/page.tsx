"use client";

import { getCart, setCart } from "@/common/localStorage";
import CardList from "@/components/card-list";
import { guidelinesStore } from "@/data/guidelines";
import { useEffect, useState } from "react";

export default function Home() {
  const [guidelines, setGuidelines] = useState(guidelinesStore);

  useEffect(() => {
    setGuidelines(guidelinesStore);
  }, []);

  const addGuidelineToProject = (id: number, name: string) => {
    const cart = getCart();

    if (cart) {
      const cartParsed = JSON.parse(cart);
      const guides = [...cartParsed.guidelines];

      guides.push({ id, name });

      setCart({
        ...cartParsed,
        guidelines: guides,
      });
    }
  };

  return (
    <div className="homepage">
      <div>
        <h1 className="heading-1">Diretrizes de acessibilidade</h1>
      </div>
      <CardList
        data={guidelines}
        hasAdd={true}
        onAdd={addGuidelineToProject}
        errorMsg="Ainda não existem diretrizes cadastradas"
      />
    </div>
  );
}
