"use client";

import { getCart, setCart } from "@/common/localStorage";
import { ButtonDefault } from "@/common/styles/button";
import { Form, InputTransparent, Textarea } from "@/common/styles/form";
import { Heading3 } from "@/common/styles/heading";
import CardList from "@/components/card-list";
import { addProject } from "@/data/projects";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  flex: 1;

  form {
    > input:nth-child(1) {
      margin: 0 auto;
    }
  }

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: ${(props) => props.theme.spacing.md};
    margin-top: ${(props) => props.theme.spacing.md};

    > div:nth-child(1) {
      display: flex;
      align-items: center;
      column-gap: ${(props) => props.theme.spacing.sm};
    }
  }
`;

export default function AddProject() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [guidelines, setGuidelines] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    const cart = getCart();

    if (cart) {
      const cartParsed = JSON.parse(cart);

      setName(cartParsed.name);
      setDesc(cartParsed.desc);
      setGuidelines(cartParsed.guidelines);
    }
  }, []);

  useEffect(() => {
    const cart = getCart();

    if (cart) {
      const cartParsed = JSON.parse(cart);
      const guides = [...cartParsed.guidelines];

      setCart({
        name,
        desc,
        guidelines: guides,
      });
    }
  }, [name, desc]);

  const deleteGuidelineFromProject = (id: number) => {
    const cart = getCart();

    if (cart) {
      const cartParsed = JSON.parse(cart);
      const guides = [...cartParsed.guidelines];

      const newGuides = guides.filter((guide) => guide.id !== id);

      setCart({
        ...cartParsed,
        guidelines: newGuides,
      });

      setGuidelines(newGuides);
    }
  };

  const createProject = () => {
    addProject({
      userId: 1,
      name,
      desc,
      guidelines,
    });
  };

  return (
    <Wrapper>
      <Form>
        <InputTransparent
          value={name}
          placeholder="Acessibiweb"
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={6}
          placeholder="Centralizar e organizar diretrizes de acessibilidade digital em uma plataforma acessível e intuitiva, facilitando o acesso a informações essenciais e incentivando a criação de experiências digitais mais inclusivas e alinhadas aos padrões de acessibilidade digital."
        />
      </Form>
      <div>
        <div>
          <Heading3>Diretrizes selecionadas</Heading3>
          <Link className="btn-link" href="/">
            +
          </Link>
        </div>
        <CardList
          data={guidelines}
          hasDelete={true}
          onDelete={deleteGuidelineFromProject}
          errorMsg="Você ainda não incluiu diretrizes no seu projeto"
        />
      </div>
      <div style={{ margin: "30px auto 0" }}>
        <ButtonDefault onClick={createProject}>Criar</ButtonDefault>
      </div>
    </Wrapper>
  );
}
