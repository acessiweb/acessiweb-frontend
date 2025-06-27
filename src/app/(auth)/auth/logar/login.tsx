"use client";

import Link from "next/link";
import { FaSquareXTwitter, FaSquareFacebook, FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { Params } from "@/types/params";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import usePassword from "../../_hooks/usePassword";
import EmailorMobilePhone from "../../_components/EmailOrMobilePhone";
import useEmailOrMobilePhone from "../../_hooks/useEmailOrMobilePhone";
import Password from "../../_components/Password";
import { useRouter } from "next/navigation";
import useErrors from "@/hooks/useErrors";
import Errors from "@/components/Errors";
import { useHotkeys } from "react-hotkeys-hook";
import InputTextVoice from "@/components/InputTextVoice";

type LoginProps = Params;

export default function Login({ searchParams }: LoginProps) {
  const router = useRouter();
  const { hide, handlePassword } = usePassword();
  const { errorMsgs, handleErrorMsgs, isAlert } = useErrors({
    alertMsg:
      searchParams.error && searchParams.error === "AccessDenied"
        ? "Ocorreu um erro: Não foi possível realizar a autenticação. Tente novamente."
        : "",
  });
  const { handleType, inputType } = useEmailOrMobilePhone();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const loginWithGoogle = () => {
    signIn("google", {
      callbackUrl: "/",
      redirect: true,
    });
  };

  const loginWithX = () => {
    signIn("twitter", {
      callbackUrl: "/",
      redirect: true,
    });
  };

  const onSubmit = async (data: LoginSchema) => {
    if (!data.email && !data.mobilePhone) {
      handleErrorMsgs("Email ou número de celular precisa ser informado");
    } else {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result && result.error) {
        handleErrorMsgs(JSON.parse(result.error));
      } else {
        reset();
        router.push("/");
      }
    }
  };

  const handleSetValue = (name: string, value: string) => {
    if (name === "email" || name === "mobilePhone" || name === "password") {
      setValue(name, value);
    }
  };

  useHotkeys("G", loginWithGoogle);
  useHotkeys("X", loginWithX);

  return (
    <div className="login">
      <form className="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <EmailorMobilePhone handleType={handleType} type={inputType}>
          {inputType === "E-mail" && (
            <InputTextVoice
              useWatchName={"email"}
              handleSetValue={handleSetValue}
              keycut="alt+shift+e"
              context="email"
            >
              <input
                {...register("email")}
                placeholder="email: meuemail@exemplo.com"
                id="email"
                name="email"
                aria-invalid={errors.email ? true : false}
                aria-errormessage={errors.email ? "invalid-email" : undefined}
                maxLength={512}
              />
            </InputTextVoice>
          )}
          {inputType === "Celular" && (
            <InputTextVoice
              useWatchName={"mobilePhone"}
              handleSetValue={handleSetValue}
              keycut="alt+shift+c"
            >
              <input
                {...register("mobilePhone")}
                placeholder="celular: 49999998888"
                id="mobilePhone"
                name="mobilePhone"
                aria-invalid={errors.mobilePhone ? true : false}
                aria-errormessage={
                  errors.mobilePhone ? "invalid-mobile-phone" : undefined
                }
              />
            </InputTextVoice>
          )}
        </EmailorMobilePhone>
        {errors.email && (
          <small role="status" id="invalid-email" className="form-error-msg">
            {errors.email.message}
          </small>
        )}
        {errors.mobilePhone && (
          <small
            role="status"
            id="invalid-mobile-phone"
            className="form-error-msg"
          >
            {errors.mobilePhone.message}
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
          <small role="status" id="invalid-password" className="form-error-msg">
            {errors.password.message}
          </small>
        )}
        <button type="submit">Logar</button>
      </form>
      {errorMsgs.length > 0 && <Errors isAlert={isAlert} msgs={errorMsgs} />}
      <div className="login__links-container">
        <div>
          <span aria-hidden={true}>Não possui conta? </span>
          <Link href="/auth/criar-conta" aria-label="Criar conta">
            Crie aqui
          </Link>
        </div>
        <div>
          <span aria-hidden={true}>Esqueceu sua senha? </span>
          <Link href="/auth/recuperar-conta">Recuperar conta</Link>
        </div>
      </div>
      <div className="login__social-media-container">
        <span aria-hidden={true}>Acesse também com</span>
        <div>
          <button
            onClick={loginWithGoogle}
            aria-label="Logar com Google"
            title="Pressione a tecla G"
            aria-keyshortcuts="G"
          >
            <FaGoogle aria-hidden={true} focusable={false} />
          </button>
          <button
            onClick={loginWithX}
            aria-label="Logar com X"
            title="Pressione a tecla X"
            aria-keyshortcuts="X"
          >
            <FaSquareXTwitter aria-hidden={true} focusable={false} />
          </button>
          <button>
            <FaSquareFacebook aria-hidden={true} focusable={false} />
          </button>
        </div>
      </div>
    </div>
  );
}
