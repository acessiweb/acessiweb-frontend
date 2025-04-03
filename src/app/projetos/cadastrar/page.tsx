"use client";

import CardList from "@/components/card-list";
import { useCart } from "@/context/cart";
import { addProject } from "@/data/projects";
import createProjectSchema, {
  type AddProject,
} from "@/schemas/projects/add-project";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function AddProject() {
  const { cart, removeGuidelineOfCart, addDescriptionToCart, addNameToCart } =
    useCart();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProjectSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = () => {
    addProject({
      userId: "1",
      name: cart.name,
      desc: cart.description,
      guidelines: cart.guidelines,
    });
  };

  return (
    <div className="add-project">
      <form
        className="form"
        onSubmit={(e) => {
          setValue("guidelines", cart.guidelines);
          handleSubmit(onSubmit)(e);
        }}
      >
        <div className="add-project__wrapper-left">
          <div className="add-project__wrapper-left__left">
            <input
              {...register("name")}
              className="input-transparent"
              value={cart.name}
              maxLength={150}
              placeholder="Acessibiweb"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                addNameToCart(e.target.value)
              }
            />
            {errors.name?.message && (
              <p className="form-error-msg">{errors.name?.message}</p>
            )}
            <textarea
              {...register("description")}
              className="textarea"
              value={cart.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                addDescriptionToCart(e.target.value)
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
              data={cart.guidelines}
              hasDelete={true}
              onDelete={removeGuidelineOfCart}
              errorMsg="Você ainda não incluiu diretrizes no seu projeto"
              showErrorMsgImage={false}
            />
            {errors.guidelines?.message && (
              <p className="form-error-msg">{errors.guidelines?.message}</p>
            )}
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
