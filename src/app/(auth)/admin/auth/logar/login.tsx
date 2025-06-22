"use client";

import InputTextVoice from "@/components/input-text-voice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useErrorMsgs from "@/hooks/useErrors";
import { signIn } from "next-auth/react";
import { Params } from "@/types/params";
import { adminLoginSchema, AdminLoginSchema } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";
import Password from "@/app/(auth)/_components/Password";
import usePassword from "@/app/(auth)/_hooks/usePassword";
import Errors from "@/components/errors";

type LoginProps = Params;

export default function Login({ searchParams }: LoginProps) {
  const router = useRouter();
  const { hide, handlePassword } = usePassword();
  const { errorMsgs, handleErrorMsgs, isAlert } = useErrorMsgs({
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
    reset,
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onBlur",
  });

  const onSubmit = async () => {
    const values = getValues();

    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result && result.error) {
      handleErrorMsgs(JSON.parse(result.error));
    } else {
      reset();
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
      <h3 className="heading-3">Acesso admin</h3>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <InputTextVoice
          useWatchName={"email"}
          handleSetValue={handleSetValue}
          context="email"
          keycut="alt+shift+e"
        >
          <input
            {...register("email")}
            placeholder="Email: exemplo@gmail.com"
            id="email"
            name="email"
            aria-invalid={errors.email ? true : false}
            aria-errormessage={errors.email ? "invalid-email" : undefined}
            maxLength={512}
          />
        </InputTextVoice>
        {errors.email && (
          <small role="status" className="form-error-msg" id="invalid-email">
            {errors.email.message}
          </small>
        )}
        <Password hide={hide} handlePassword={handlePassword}>
          <InputTextVoice
            useWatchName={"password"}
            handleSetValue={handleSetValue}
            keycut="alt+shift+s"
          >
            <input
              {...register("password")}
              type={hide ? "password" : "text"}
              placeholder="senha"
              id="password"
              name="password"
              aria-invalid={errors.password ? true : false}
              aria-errormessage={
                errors.password ? "invalid-password" : undefined
              }
            />
          </InputTextVoice>
        </Password>
        {errors.password && (
          <small role="status" className="form-error-msg" id="invalid-password">
            {errors.password.message}
          </small>
        )}
        {errorMsgs.length > 0 && <Errors isAlert={isAlert} msgs={errorMsgs} />}
        <button type="submit">Logar</button>
      </form>
    </div>
  );
}
