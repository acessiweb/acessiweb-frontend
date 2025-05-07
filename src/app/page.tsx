"use client";

import CardList from "@/components/card-list";
import Head from "@/components/head";
import { Search } from "@/components/search";
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
    <>
      <Head title="Página inicial - diretrizes de acessibilidade" />
      <div className="homepage">
        <div>
          <h1 className="heading-1">Diretrizes de acessibilidade</h1>
        </div>
        <form>
          <div className="homepage__search-guideline">
            <p>Buscar por</p>
            <Search searchText="Busque por uma palavra-chave" />
          </div>
          <div className="homepage__guideline-checkbox-group">
            <div>
              <input
                className="input-checkbox"
                type="checkbox"
                id="visual"
                name="visual"
                value="Visual"
              />
              <label htmlFor="visual"> Visual</label>
            </div>
            <div>
              <input
                className="input-checkbox"
                type="checkbox"
                id="hearing"
                name="hearing"
                value="Auditiva"
              />
              <label htmlFor="hearing"> Auditiva</label>
            </div>
            <div>
              <input
                className="input-checkbox"
                type="checkbox"
                id="motor"
                name="motor"
                value="Motora"
              />
              <label htmlFor="motor"> Motora</label>
            </div>
            <div>
              <input
                className="input-checkbox"
                type="checkbox"
                id="neural"
                name="neural"
                value="Neural"
              />
              <label htmlFor="neural"> Neural</label>
            </div>
            <div>
              <input
                className="input-checkbox"
                type="checkbox"
                id="tea"
                name="tea"
                value="TEA"
              />
              <label htmlFor="tea"> TEA</label>
            </div>
          </div>
        </form>
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
