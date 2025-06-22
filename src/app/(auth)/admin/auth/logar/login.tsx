"use client";

import InputTextVoice from "@/components/input-text-voice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useErrorMsgs from "@/hooks/useErrors";
import { signIn } from "next-auth/react";
import Help from "@/common/nav/help";
import { CTRL, SHIFT } from "@/common/utils/commands";
import { useHotkeys } from "react-hotkeys-hook";
import { Params } from "@/types/params";
import usePassword from "@/app/(auth)/_hooks/usePassword";
import { adminLoginSchema, AdminLoginSchema } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";

const keycuts = [
  {
    keys: [SHIFT, "E"],
    description: "Inserir email",
  },
  {
    keys: [CTRL, SHIFT, "E"],
    description: "Inserir email por voz",
  },
  {
    keys: [SHIFT, "S"],
    description: "Inserir senha",
  },
  {
    keys: [CTRL, SHIFT, "S"],
    description: "Inserir senha por voz",
  },
  {
    keys: ["S"],
    description: "Alternar mostrar senha",
  },
];

type LoginProps = Params;

export default function Login({ searchParams }: LoginProps) {
  const router = useRouter();
  const { Eye: EyePass, hide: passHide, handlePassword } = usePassword();
  const { ErrorsMsgs, handleErrorMsg } = useErrorMsgs({
    alertMsg:
      searchParams.error && searchParams.error === "AccessDenied"
        ? "Ocorreu um erro: Não foi possível realizar autenticação"
        : "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onBlur",
  });

  useHotkeys("S", handlePassword);
  useHotkeys("shift+e", () => document.getElementById("email")?.focus());
  useHotkeys("shift+s", () => document.getElementById("password")?.focus());

  const onSubmit = async () => {
    const values = getValues();

    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.error) {
      handleErrorMsg(result.error);
    } else {
      router.push("/admin");
    }
  };

  const handleSetValue = (name: string, value: string) => {
    if (name === "email" || name === "password") {
      setValue(name, value);
    }
  };

  return (
    <div className="login">
      <Help keycuts={keycuts} />
      <h3 className="heading-3">Acesso admin</h3>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <InputTextVoice
          useWatchName={"email"}
          handleSetValue={handleSetValue}
          context="email"
          keycut="E"
        >
          <input
            {...register("email")}
            placeholder="Email: exemplo@gmail.com"
            id="email"
            name="email"
            aria-describedby={errors.email ? "invalid-email" : undefined}
          />
        </InputTextVoice>
        {errors.email && (
          <small role="status" className="auth__error-msg" id="invalid-email">
            {errors.email.message}
          </small>
        )}
        <InputTextVoice
          useWatchName="password"
          handleSetValue={handleSetValue}
          keycut="S"
        >
          <>
            <input
              {...register("password")}
              type={passHide ? "password" : "text"}
              placeholder="Senha"
              id="password"
              name="password"
              aria-describedby={
                errors.password ? "invalid-password" : undefined
              }
            />
            <EyePass />
          </>
        </InputTextVoice>
        {errors.password && (
          <small
            role="status"
            className="auth__error-msg"
            id="invalid-password"
          >
            {errors.password.message}
          </small>
        )}
        <ErrorsMsgs />
        <button className="auth__btn" type="submit">
          Logar
        </button>
      </form>
    </div>
  );
}
