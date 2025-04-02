"use client";

import { getCart, setCart } from "@/common/localStorage";
import CardList from "@/components/card-list";
import { addProject } from "@/data/projects";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <div>
      <form className="form">
        <input
          className="input-transparent"
          value={name}
          placeholder="Acessibiweb"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <textarea
          className="textarea"
          value={desc}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDesc(e.target.value)
          }
          rows={6}
          placeholder="Centralizar e organizar diretrizes de acessibilidade digital em uma plataforma acessível e intuitiva, facilitando o acesso a informações essenciais e incentivando a criação de experiências digitais mais inclusivas e alinhadas aos padrões de acessibilidade digital."
        />
      </form>
      <div>
        <div>
          <h3 className="heading-3">Diretrizes selecionadas</h3>
          <Link className="btn-link-default" href="/">
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
        <button className="btn-default" onClick={createProject}>
          Criar
        </button>
      </div>
    </div>
  );
}
