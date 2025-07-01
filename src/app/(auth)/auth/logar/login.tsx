"use client";

import Link from "next/link";
import { FaSquareXTwitter, FaSquareFacebook, FaGoogle } from "react-icons/fa6";
import EmailOrPasswordInput from "../../_components/email-or-password";
import { useRef } from "react";
import useEmailOrPassword from "../../_hooks/useEmailOrPassword";

export default function Login() {
  const emailOrPasswordInputRef = useRef<HTMLInputElement>(null);
  const { btnText, inputType, toggleType } = useEmailOrPassword();

  return (
    <div className="login">
      <form>
        <EmailOrPasswordInput
          ref={emailOrPasswordInputRef}
          btnText={btnText}
          inputType={inputType}
          onClick={toggleType}
        />
        <input placeholder="Senha" />
        <button type="submit">Logar</button>
      </form>
      <div className="login__links">
        <div>
          <span>Não possui conta? </span>
          <Link href="/auth/criar-conta">Crie aqui</Link>
        </div>
        <div>
          <span>Esqueceu sua senha?</span>
          <Link href="/auth/recuperar-conta">Recuperar conta</Link>
        </div>
      </div>
      <div className="login__social-media">
        <span>Acesse também com</span>
        <div>
          <FaGoogle />
          <FaSquareXTwitter />
          <FaSquareFacebook />
        </div>
      </div>
    </div>
  );
}
