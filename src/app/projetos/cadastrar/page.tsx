"use client";

import CardList from "@/components/card-list";
import { useCart } from "@/context/cart";
import { useProjects } from "@/context/projects";
import { usePush } from "@/context/push";
import createProjectSchema from "@/schemas/projects/add-project";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function AddProject() {
  const {
    cart,
    removeGuidelineOfCart,
    addDescriptionToCart,
    addNameToCart,
    cleanCart,
  } = useCart();
  const { setShowPush, setPushMsg } = usePush();
  const { addProject } = useProjects();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(createProjectSchema),
    values: {
      name: cart.name,
      description: cart.description,
      guidelines: cart.guidelines,
      userId: "1",
    },
  });

  const onSubmit = () => {
    const values = getValues();

    const id = addProject({
      userId: values.userId,
      name: values.name,
      description: values.description,
      guidelines: values.guidelines || [],
    });

    if (id) {
      cleanCart();
      setShowPush(true);
      setPushMsg("Projeto cadastrado com sucesso 🥳");
    }
  };

  return (
    <div className="cart">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="cart__wrapper-left">
          <div className="cart__wrapper-left__left">
            <input
              {...register("name")}
              className="input-transparent"
              maxLength={150}
              placeholder="Acessibiweb"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                addNameToCart(e.target.value)
              }
            />
            {errors.name && (
              <p className="form-error-msg">{errors.name?.message}</p>
            )}
            <textarea
              {...register("description")}
              className="textarea"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                addDescriptionToCart(e.target.value)
              }
              rows={11}
              placeholder="Centralizar e organizar diretrizes de acessibilidade digital em uma plataforma acessível e intuitiva, facilitando o acesso a informações essenciais e incentivando a criação de experiências digitais mais inclusivas e alinhadas aos padrões de acessibilidade digital."
            />
          </div>
          <div className="cart__wrapper-left__guidelines">
            <div className="cart__wrapper-left__guidelines__header">
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
            {errors.guidelines && (
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
