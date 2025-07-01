"use client";

import Link from "next/link";
import EmailOrPasswordInput from "../../_components/email-or-password";
import { useRef } from "react";
import useEmailOrPassword from "../../_hooks/useEmailOrPassword";

export default function CreateAccount() {
  const emailOrPasswordInputRef = useRef<HTMLInputElement>(null);
  const { btnText, inputType, toggleType } = useEmailOrPassword();

  return (
    <div className="create-account">
      <form>
        <input placeholder="Nome de usuário" />
        <EmailOrPasswordInput
          ref={emailOrPasswordInputRef}
          btnText={btnText}
          inputType={inputType}
          onClick={toggleType}
        />
        <input placeholder="Senha" />
        <input placeholder="Confirmar senha" />
        <div>
          <button type="submit">Logar</button>
          <Link href="/auth/logar">Voltar</Link>
        </div>
      </form>
    </div>
  );
}
