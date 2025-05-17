"use client";

// import CardList from "@/components/card-list";
import Head from "@/components/head";
import { useCart } from "@/context/cart";
import { useProjects } from "@/context/projects";
import { usePush } from "@/context/push";
import createProjectSchema from "@/schemas/projects/add-project";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { captureVoiceAndPrintText } from "@/common/utils/voice";
import Card from "@/components/card";
import CardDelete from "@/common/card/delete";
import useScreenSize from "@/hooks/useScreenSize";
import { TABLET_SCREEN_SIZE } from "@/common/utils/var";
import { useState } from "react";

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
  const { screenSize } = useScreenSize();
  const [showGuidelines, setShowGuidelines] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
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
    <>
      <Head title="Adicionar projeto" />
      <div className="cart">
        <form className="cart__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="cart__form__project-name">
            <button
              className="mic btn-icon"
              type="button"
              onClick={() =>
                captureVoiceAndPrintText("project-name", "name", setValue)
              }
            >
              <MicNoneOutlinedIcon />
            </button>
            <input
              {...register("name")}
              maxLength={150}
              placeholder="Acessiweb"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                addNameToCart(e.target.value)
              }
              id="project-name"
              name="project-name"
            />
          </div>
          {errors.name && (
            <p className="form-error-msg">{errors.name.message}</p>
          )}
          <div>
            <button
              onClick={() => setShowGuidelines((prev) => !prev)}
              type="button"
            >
              Diretrizes selecionadas
            </button>
            <Link className="btn-icon" href="/diretrizes">
              &#43;
            </Link>
          </div>
          {errors.guidelines && (
            <p className="form-error-msg">{errors.guidelines.message}</p>
          )}
          <div className="cart__form__project-desc">
            <textarea
              {...register("description")}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                addDescriptionToCart(e.target.value)
              }
              rows={screenSize.width <= TABLET_SCREEN_SIZE ? 8 : 4}
              placeholder="Centralizar e organizar diretrizes de acessibilidade digital em uma plataforma acessível e intuitiva, facilitando o acesso a informações essenciais e incentivando a criação de experiências digitais mais inclusivas e alinhadas aos padrões de acessibilidade digital."
              id="project-description"
              name="project-description"
            />
            <button
              className="btn-icon"
              type="button"
              onClick={() =>
                captureVoiceAndPrintText(
                  "project-description",
                  "description",
                  setValue
                )
              }
            >
              <MicNoneOutlinedIcon />
            </button>
          </div>
          {showGuidelines && (
            <div className="cart__form__project-guidelines">
              {cart.guidelines.length > 0 ? (
                <div className="grid">
                  {cart.guidelines.map((guide, i) => (
                    <div className="grid__item" key={i}>
                      <Card mainText={guide.name} registerId={guide.id}>
                        <CardDelete
                          onDelete={removeGuidelineOfCart}
                          registerId={guide.id}
                          registerName={guide.name}
                        />
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Você ainda não incluiu diretrizes no seu projeto</p>
              )}
            </div>
          )}
          <div className="cart__form__btn">
            <button type="submit" className="btn-default">
              Criar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
