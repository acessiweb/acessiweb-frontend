import { guidelinesStore } from "@/data/guidelines";
import { ReactNode, useEffect, useState } from "react";
import Card from "./card";
import NoRegistersFound from "./not-found";
import CardUpdateAndDelete from "@/common/card/update-and-delete";
import { useCart } from "@/context/cart";
import CardAdd from "@/common/card/add";

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
        <div className="list">
          {guidelines.map((guideline, i) => (
            <div className="list__item" key={i}>
              <Card
                // readRoute="/projetos/[id]"
                mainText={guideline.name}
                registerId={guideline.id}
              >
                {isAdmin ? (
                  <CardUpdateAndDelete
                    registerId={guideline.id}
                    registerName={guideline.name}
                    updateRoute=""
                    onDelete={() => {}}
                  />
                ) : (
                  <CardAdd
                    onAdd={addGuidelinesToCart}
                    registerId={guideline.id}
                    registerName={guideline.name}
                  />
                )}
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <NoRegistersFound errorMsg="Ainda não existem diretrizes cadastradas" />
      )}
    </div>
  );
}
