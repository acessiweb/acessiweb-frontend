"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useEmailOrMobilePhone from "../../_hooks/useEmailOrMobilePhone";
import EmailorMobilePhone from "../../_components/EmailOrMobilePhone";
import Link from "next/link";
import {
  createCommonUserSchema,
  CreateCommonUserSchema,
} from "@/schemas/user.schema";
import Password from "../../_components/Password";
import usePassword from "../../_hooks/usePassword";
import useErrors from "@/hooks/useErrors";
import Errors from "@/components/errors";
import { createAccount } from "@/routes/common-users";
import { useRouter } from "next/navigation";
import InputTextVoice from "@/components/input-text-voice";

export default function CreateAccount() {
  const router = useRouter();
  const { handleType, inputType } = useEmailOrMobilePhone();
  const { hide, handlePassword } = usePassword();
  const { hide: hideConfirmPassword, handlePassword: handleConfirmPassword } =
    usePassword();
  const { errorMsgs, handleErrorMsgs, isAlert } = useErrors();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm<CreateCommonUserSchema>({
    resolver: zodResolver(createCommonUserSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateCommonUserSchema) => {
    if (!data.email && !data.mobilePhone) {
      handleErrorMsgs("Email ou número de celular precisa ser informado");
    } else {
      const result = await createAccount(data);

      if ("id" in result) {
        reset();
        router.push("/auth/logar");
      } else {
        handleErrorMsgs(result);
      }
    }
  };

  const handleSetValue = (name: string, value: string) => {
    if (
      name === "username" ||
      name === "email" ||
      name === "mobilePhone" ||
      name === "password"
    ) {
      setValue(name, value);
    }
  };

  return (
    <div className="create-account">
      <h3 className="heading-3">Criar minha conta</h3>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <InputTextVoice
          useWatchName={"username"}
          handleSetValue={handleSetValue}
          keycut="alt+shift+u"
        >
          <input
            {...register("username")}
            id="username"
            name="username"
            placeholder="Nome de usuário"
            aria-invalid={errors.username ? true : false}
            aria-errormessage={errors.username ? "invalid-username" : undefined}
            maxLength={30}
          />
        </InputTextVoice>
        {errors.username && (
          <small role="status" id="invalid-username" className="form-error-msg">
            {errors.username.message}
          </small>
        )}
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
        <Password
          hide={hideConfirmPassword}
          handlePassword={handleConfirmPassword}
        >
          <InputTextVoice
            useWatchName={"confirmPassword"}
            handleSetValue={handleSetValue}
            keycut="alt+shift+v"
          >
            <input
              {...register("confirmPassword")}
              type={hide ? "password" : "text"}
              placeholder="confirmar senha"
              id="confirmPassword"
              name="confirmPassword"
              aria-invalid={errors.confirmPassword ? true : false}
              aria-errormessage={
                errors.confirmPassword ? "invalid-confirm-password" : undefined
              }
            />
          </InputTextVoice>
        </Password>
        {errors.confirmPassword && (
          <small
            role="status"
            id="invalid-confirm-password"
            className="form-error-msg"
          >
            {errors.confirmPassword.message}
          </small>
        )}
        {errorMsgs.length > 0 && <Errors isAlert={isAlert} msgs={errorMsgs} />}
        <div style={{ margin: "auto" }}>
          <button type="submit">Logar</button>
          <Link href="/auth/logar" aria-label="Voltar para página anterior">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
