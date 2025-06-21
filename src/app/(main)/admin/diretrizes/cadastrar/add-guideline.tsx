"use client";

import { useForm } from "react-hook-form";
import InputTextVoice from "@/components/input-text-voice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateGuidelineSchema,
  createGuidelineSchema,
} from "@/schemas/guideline.schema";
import Code from "@/components/code";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FileInput from "@/components/file-input";
import GuidelinesDeficiencesFilter from "@/components/guide-deficiences-filter";
import useFilters from "@/hooks/useFilters";
import { Breadcrumb } from "@/components/breadcrumb";
import { useSession } from "next-auth/react";
import { useCommands } from "@/context/commands";
import useErrorMsgs from "@/hooks/useErrorMsgs";
import { createGuideline } from "@/routes/guidelines";
import { usePush } from "@/context/push";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

const keycuts = {
  "alt+shift+n": ["alt+shift+n", "Escrever nome por comando de voz"],
  n: ["n", "Escrever nome"],
  "alt+shift+d": ["alt+shift+d", "Escrever descrição por comando de voz"],
  d: ["d", "Escrever descrição"],
  c: ["c", "Escrever código"],
  "alt+shift+g": [
    "alt+shift+g",
    "Escrever descrição da imagem por comando de voz",
  ],
  f: ["f", "Escolher uma imagem"],
  g: ["g", "Escrever descrição da imagem"],
  v: ["v", "Alternar deficiência visual"],
  r: ["r", "Alternar deficiência neural"],
  t: ["t", "Alternar TEA"],
  m: ["m", "Alternar deficiência motora"],
  a: ["a", "Alternar deficiência auditiva"],
  s: ["s", "Criar diretriz"],
};

const crumbs = [
  {
    desc: "DIRETRIZES",
    link: `/admin/diretrizes`,
  },
  {
    desc: "CADASTRAR DIRETRIZ",
    link: `/admin/diretrizes/cadastrar`,
  },
];

export default function AddGuideline({
  isSecPage = false,
  handleSecPageTitle,
}: {
  isSecPage?: boolean;
  handleSecPageTitle?: Dispatch<SetStateAction<string>>;
}) {
  const {
    handleHearing,
    handleMotor,
    handleNeural,
    handleTea,
    handleVisual,
    hearing,
    motor,
    neural,
    search,
    tea,
    visual,
  } = useFilters();
  const { data: sessionData } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateGuidelineSchema>({
    resolver: zodResolver(createGuidelineSchema),
  });
  const { setKeycuts } = useCommands();
  const [filename, setFilename] = useState("");
  const { ErrorsMsgs, handleErrorMsg, handleErrorMsgs } = useErrorMsgs();
  const { setPushMsg } = usePush();
  const router = useRouter();
  const [code, setCode] = useState("");
  useHotkeys(keycuts.n[0], () => document.getElementById("guideName")?.focus());
  useHotkeys(keycuts.d[0], () => document.getElementById("desc")?.focus());
  useHotkeys(keycuts.g[0], () => document.getElementById("imageDesc")?.focus());

  useEffect(() => {
    setKeycuts(keycuts);
  }, []);

  useEffect(() => {
    setValue("deficiences", [hearing, visual, motor, neural, tea]);
  }, [hearing, visual, motor, neural, tea]);

  const guidelineImage = watch("guideImage");
  const guidelineName = watch("guideName");

  useEffect(() => {
    if (isSecPage && handleSecPageTitle) {
      handleSecPageTitle(`Cadastrar ${guidelineName || "diretriz"}`);
    }
  }, [isSecPage, guidelineName, handleSecPageTitle]);

  useEffect(() => {
    if (guidelineImage instanceof FileList) {
      setFilename(guidelineImage[0]?.name || "");
    }
  }, [guidelineImage]);

  const handleSetValue = (name: string, value: string) => {
    if (name === "guideName" || name === "desc" || name === "imageDesc") {
      setValue(name, value);
    }
  };

  const onSubmit = async (data: CreateGuidelineSchema) => {
    if (data.deficiences.toString().replaceAll(",", "").length == 0) {
      handleErrorMsg(
        "A diretriz precisa ter ao menos uma deficiência relacionada"
      );
    } else {
      handleErrorMsg("");
      const formData = new FormData();

      formData.append("name", data.guideName);
      formData.append("desc", data.desc);
      formData.append("image", data.guideImage[0]);
      formData.append("imageDesc", data.imageDesc!);
      formData.append("deficiences", JSON.stringify(data.deficiences));
      formData.append("code", code);

      if (sessionData && sessionData.user && sessionData.user.id) {
        const res = await createGuideline(sessionData.user.id, formData);

        if ("errors" in res) {
          handleErrorMsgs(res);
          setPushMsg("");
        } else if ("id" in res) {
          setPushMsg("Diretriz cadastrada com sucesso 🎉");
          reset();
          router.push("/admin/diretrizes");
        }
      }
    }
  };

  return (
    <div className="add-guideline">
      {!isSecPage && <Breadcrumb crumbs={crumbs} />}
      {!isSecPage && <h1 className="heading-1">Cadastro de diretriz</h1>}
      <form className="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <InputTextVoice
          useWatchName={"guideName"}
          handleSetValue={handleSetValue}
          keycut={keycuts["alt+shift+n"][0]}
        >
          <input
            {...register("guideName")}
            placeholder="Nome da diretriz"
            id="guideName"
            name="guideName"
            aria-invalid={errors.guideName ? true : false}
            aria-keyshortcuts={keycuts.n[0]}
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
        <InputTextVoice
          useWatchName={"desc"}
          handleSetValue={handleSetValue}
          keycut={keycuts["alt+shift+d"][0]}
        >
          <textarea
            {...register("desc")}
            placeholder="Descrição da diretriz"
            id="desc"
            name="desc"
            aria-invalid={errors.desc ? true : false}
            className="input-transparent"
            aria-errormessage={
              errors.desc ? "invalid-guideline-desc" : undefined
            }
            aria-keyshortcuts={keycuts.d[0]}
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
          code={code}
        />
        <FileInput
          filename={filename}
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
        <InputTextVoice
          useWatchName={"imageDesc"}
          handleSetValue={handleSetValue}
          keycut={keycuts["alt+shift+g"][0]}
        >
          <input
            {...register("imageDesc")}
            placeholder="Descrição da imagem"
            id="imageDesc"
            name="imageDesc"
            className="input-transparent"
            aria-invalid={errors.imageDesc ? true : false}
            aria-errormessage={
              errors.imageDesc ? "invalid-guideline-image-desc" : undefined
            }
            aria-keyshortcuts={keycuts.g[0]}
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
          />
        </div>
        <ErrorsMsgs />
        <div className="cart__form__btn">
          <button type="submit" className="btn-default">
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
