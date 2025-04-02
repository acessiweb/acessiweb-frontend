"use client";

import { getCart, setCart } from "@/common/localStorage";
import CardList from "@/components/card-list";
import { addProject } from "@/data/projects";
import createProjectSchema, {
  type AddProject,
} from "@/schemas/projects/add-project";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProject() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [guidelines, setGuidelines] = useState<{ id: number; name: string }[]>(
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProjectSchema),
  });

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

  const onSubmit = (data: AddProject) => {
    addProject({
      userId: 1,
      name: data.name,
      desc: data.description,
      guidelines,
    });
  };

  return (
    <div className="add-project">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="add-project__wrapper-left">
          <div className="add-project__wrapper-left__left">
            <input
              {...register("name")}
              className="input-transparent"
              value={name}
              maxLength={150}
              placeholder="Acessibiweb"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            {errors.name?.message && (
              <p className="form-error-msg">{errors.name?.message}</p>
            )}
            <textarea
              {...register("description")}
              className="textarea"
              value={desc}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDesc(e.target.value)
              }
              rows={11}
              placeholder="Centralizar e organizar diretrizes de acessibilidade digital em uma plataforma acessível e intuitiva, facilitando o acesso a informações essenciais e incentivando a criação de experiências digitais mais inclusivas e alinhadas aos padrões de acessibilidade digital."
            />
          </div>
          <div className="add-project__wrapper-left__guidelines">
            <div className="add-project__wrapper-left__guidelines__header">
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
              showErrorMsgImage={false}
            />
          </div>
        </div>
        <div style={{ margin: "30px auto 0" }}>
          <button type="submit" className="btn-default">
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
