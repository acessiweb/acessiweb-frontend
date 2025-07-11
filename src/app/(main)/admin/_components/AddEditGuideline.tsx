"use client";

import { useForm } from "react-hook-form";
import InputTextVoice from "@/components/InputTextVoice";
import { zodResolver } from "@hookform/resolvers/zod";
import Code from "@/components/Code";
import { useEffect, useState } from "react";
import FileInput from "@/components/FileInput";
import GuidelinesDeficiencesFilter from "@/components/DeficiencesCheckbox";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSession } from "next-auth/react";
import { usePush } from "@/context/push";
import { useRouter } from "next/navigation";
import useDeficiencyFilters from "@/hooks/useDeficiencyFilters";
import {
  createEditGuidelineSchema,
  CreateEditGuidelineSchema,
} from "@/schemas/guideline.schema";
import { Guideline } from "@/types/guideline";
import { updateGuideline, createGuideline } from "@/routes/user-guidelines";
import useErrors from "@/hooks/useErrors";
import Errors from "@/components/Errors";
import { useScreenType } from "@/hooks/useScreenType";
import { Page } from "@/types/page";

type AddEditGuidelineProps = Page & {
  guideline?: Guideline;
};

export default function AddEditGuideline({
  isSecPage = false,
  handleSecPageTitle,
  isEditPage = false,
  crumbs,
  guideline,
}: AddEditGuidelineProps) {
  const {
    handleHearing,
    handleMotor,
    handleNeural,
    handleTea,
    handleVisual,
    hearing,
    motor,
    neural,
    tea,
    visual,
  } = useDeficiencyFilters({ defaultValues: guideline?.deficiences });
  const { data: sessionData } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateEditGuidelineSchema>({
    resolver: zodResolver(createEditGuidelineSchema),
    defaultValues: {
      guideName: guideline?.name,
      imageDesc: guideline?.imageDesc || "",
      desc: guideline?.description,
    },
  });
  const [filename, setFilename] = useState("");
  const { setPushMsg, setShowPush } = usePush();
  const router = useRouter();
  const { isDesktop } = useScreenType();
  const [code, setCode] = useState("");
  const { handleApiErrors, handleUniqueMsg, errorMsgs, isAlert } = useErrors();
  const guidelineImage = watch("guideImage");
  const guidelineName = watch("guideName");
  setValue("deficiences", [hearing, visual, motor, neural, tea]);

  useEffect(() => {
    if (isSecPage && handleSecPageTitle) {
      handleSecPageTitle(
        `${isEditPage ? "Editar" : "Cadastrar"} ${guidelineName || "diretriz"}`
      );
    }
  }, [handleSecPageTitle, isEditPage, guidelineName, isSecPage]);

  useEffect(() => {
    if (guidelineImage instanceof FileList) {
      setFilename(guidelineImage[0]?.name || "");
    }
  }, [guidelineImage, setFilename]);

  const handleSetValue = (name: string, value: string) => {
    if (name === "guideName" || name === "desc" || name === "imageDesc") {
      setValue(name, value);
    }
  };

  const handleResponse = () => {
    setPushMsg(
      `Diretriz ${isEditPage ? "atualizada" : "cadastrada"} com sucesso 🎉`
    );
    setShowPush(true);
    reset();

    if (isDesktop) {
      window.location.reload();
    } else {
      router.push("/admin/diretrizes");
    }
  };

  const onSubmit = async (data: CreateEditGuidelineSchema) => {
    if (data.deficiences.toString().replaceAll(",", "").length == 0) {
      handleUniqueMsg(
        "A diretriz precisa ter ao menos uma deficiência relacionada"
      );
    } else {
      const formData = new FormData();

      formData.append("name", data.guideName);
      formData.append("desc", data.desc);
      formData.append("image", data.guideImage[0]);
      formData.append("imageDesc", data.imageDesc!);
      formData.append("deficiences", JSON.stringify(data.deficiences));
      formData.append("code", code);

      if (sessionData && sessionData.user && sessionData.user.id) {
        const res =
          isEditPage && guideline && guideline.id
            ? await updateGuideline(sessionData.user.id, guideline.id, formData)
            : await createGuideline(sessionData.user.id, formData);

        if ("errors" in res) {
          handleApiErrors([res]);
          setPushMsg("");
          setShowPush(false);
        } else {
          handleResponse();
        }
      }
    }
  };

  return (
    <div className="add-guideline">
      {!isSecPage && crumbs && <Breadcrumb crumbs={crumbs} />}
      {!isSecPage && (
        <h1 className="heading-1">
          {isEditPage
            ? `Editar diretriz ${guideline?.name}`
            : "Cadastro de diretriz"}
        </h1>
      )}
      <form className="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="guideName" className="sr-only">
          Nome da diretriz
        </label>
        <InputTextVoice
          useWatchName={"guideName"}
          handleSetValue={handleSetValue}
          keycut="alt+shift+n"
        >
          <input
            {...register("guideName")}
            placeholder="Nome da diretriz, exemplo: Orientação"
            id="guideName"
            name="guideName"
            aria-invalid={errors.guideName ? true : false}
            aria-keyshortcuts="alt+shift+n"
            aria-errormessage={
              errors.guideName ? "invalid-guideline-name" : undefined
            }
          />
        </InputTextVoice>
        {errors.guideName && (
          <small
            role="status"
            id="invalid-guideline-name"
            className="form-error-msg"
          >
            {errors.guideName.message}
          </small>
        )}
        <label htmlFor="desc" className="sr-only">
          Descrição da diretriz
        </label>
        <InputTextVoice
          useWatchName={"desc"}
          handleSetValue={handleSetValue}
          keycut="alt+shift+d"
        >
          <textarea
            {...register("desc")}
            placeholder="Descrição da diretriz, exemplo: nenhuma funcionalidade deve depender de uma orientação específica a não ser que a função precise ser executada"
            id="desc"
            name="desc"
            aria-invalid={errors.desc ? true : false}
            className="input-transparent"
            aria-errormessage={
              errors.desc ? "invalid-guideline-desc" : undefined
            }
            aria-keyshortcuts="alt+shift+d"
            rows={5}
          />
        </InputTextVoice>
        {errors.desc && (
          <small
            role="status"
            id="invalid-guideline-desc"
            className="form-error-msg"
          >
            {errors.desc.message}
          </small>
        )}
        <Code
          editable={true}
          label="Escreva aqui um código que exemplifica a aplicação dessa diretriz"
          handleCode={setCode}
          code={code || guideline?.code}
        />
        <label htmlFor="guideImage" className="sr-only">
          Imagem explicativa da diretriz
        </label>
        <FileInput
          filename={filename || guideline?.image}
          id="guideImage"
          text="Selecione uma imagem que exemplifique a aplicação dessa diretriz"
        >
          <input
            {...register("guideImage")}
            type="file"
            id="guideImage"
            name="guideImage"
            style={{ display: "none" }}
            aria-invalid={errors.guideImage ? true : false}
            aria-errormessage={
              errors.guideImage ? "invalid-guideline-image" : undefined
            }
          />
        </FileInput>
        {errors.guideImage && (
          <small
            role="status"
            id="invalid-guideline-image"
            className="form-error-msg"
          >
            {errors.guideImage.message as string}
          </small>
        )}
        <label htmlFor="imageDesc" className="sr-only">
          Descrição da imagem
        </label>
        <InputTextVoice
          useWatchName={"imageDesc"}
          handleSetValue={handleSetValue}
          keycut="alt+shift+g"
        >
          <input
            {...register("imageDesc")}
            placeholder="Descrição da imagem, exemplo: exemplo de um botão..."
            id="imageDesc"
            name="imageDesc"
            className="input-transparent"
            aria-invalid={errors.imageDesc ? true : false}
            aria-errormessage={
              errors.imageDesc ? "invalid-guideline-image-desc" : undefined
            }
            aria-keyshortcuts="alt+shift+g"
          />
        </InputTextVoice>
        {errors.imageDesc && (
          <small
            role="status"
            id="invalid-guideline-image-desc"
            className="form-error-msg"
          >
            {errors.imageDesc.message}
          </small>
        )}
        <div className="add-guideline__deficiences-container">
          <span>Selecione quais deficiências essa diretriz engloba:</span>
          <GuidelinesDeficiencesFilter
            onHearingChange={handleHearing}
            onMotorChange={handleMotor}
            onNeuralChange={handleNeural}
            onTeaChange={handleTea}
            onVisualChange={handleVisual}
            hearing={hearing}
            motor={motor}
            neural={neural}
            tea={tea}
            visual={visual}
          />
        </div>
        <Errors msgs={errorMsgs} isAlert={isAlert} />
        <div className="cart__form__btn">
          <button type="submit" className="btn-default">
            {isEditPage ? "Editar" : "Criar"}
          </button>
        </div>
      </form>
    </div>
  );
}
