"use client";

import { guidelinesStore } from "@/data/guidelines";
import { ReactNode, useEffect, useState } from "react";
import NoRegistersFound from "./not-found";
import { useCart } from "@/context/cart";
import { isDesktop, isTablet } from "@/common/utils/size";
import { CardBtnAdd, CardBtnUpdateAndDelete } from "./card-btn";
import { CardLinkAdd, CardLinkUpdateAndDelete } from "./card-link";

type GuidelinesProps = {
  controlBar: ReactNode;
  isAdmin: boolean;
};

export default function Guidelines({ controlBar, isAdmin }: GuidelinesProps) {
  const [guidelines, setGuidelines] = useState(guidelinesStore);
  const { addGuidelinesToCart } = useCart();

  useEffect(() => {
    setGuidelines(guidelinesStore);
  }, []);

  return (
    <div className="guidelines">
      <h1 className="heading-1">Diretrizes de acessibilidade</h1>
      {controlBar}
      {guidelines.length > 0 ? (
        <div className="grid">
          {guidelines.map((guideline, i) => (
            <div className="grid__item" key={i}>
              {isAdmin && isDesktop() && (
                <CardBtnUpdateAndDelete
                  mainText={guideline.name}
                  onClick={() => {}}
                  onDelete={() => {}}
                  onUpdateClick={() => {}}
                  registerId={guideline.id}
                  registerName={guideline.name}
                />
              )}
              {isAdmin && isTablet() && (
                <CardLinkUpdateAndDelete
                  mainText={guideline.name}
                  onDelete={() => {}}
                  registerId={guideline.id}
                  registerName={guideline.name}
                  readRoute=""
                  updateRoute=""
                />
              )}
              {!isAdmin && isDesktop() && (
                <CardBtnAdd
                  onAdd={addGuidelinesToCart}
                  mainText=""
                  onClick={() => {}}
                  registerId=""
                  registerName=""
                />
              )}
              {!isAdmin && isTablet() && (
                <CardLinkAdd
                  onAdd={addGuidelinesToCart}
                  mainText=""
                  registerId=""
                  registerName=""
                  readRoute=""
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <NoRegistersFound errorMsg="Ainda não existem diretrizes cadastradas" />
      )}
    </div>
  );
}
