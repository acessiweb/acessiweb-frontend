"use client";

import { getCart, setCart } from "@/common/localStorage";
import { Heading1 } from "@/common/styles/heading";
import CardList from "@/components/card-list";
import { guidelinesStore } from "@/data/guidelines";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: ${(props) => props.theme.spacing.lg};
`;

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
    <Wrapper>
      <div>
        <Heading1>Diretrizes de acessibilidade</Heading1>
      </div>
      <CardList
        data={guidelines}
        hasAdd={true}
        onAdd={addGuidelineToProject}
        errorMsg="Ainda não existem diretrizes cadastradas"
      />
    </Wrapper>
  );
}
