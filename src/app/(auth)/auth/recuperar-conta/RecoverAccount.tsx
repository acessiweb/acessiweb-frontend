"use client";

import Link from "next/link";
import EmailOrPasswordInput from "../../_components/email-or-password";
import { useEffect, useRef, useState } from "react";
import useEmailOrPassword from "../../_hooks/useEmailOrPassword";

export default function RecoverAccount() {
  const emailOrPasswordInputRef = useRef<HTMLInputElement>(null);
  const [receiverType, setReceiverType] = useState("");
  const { btnText, inputType, toggleType, EMAIL } = useEmailOrPassword();

  useEffect(() => {
    if (inputType === EMAIL) {
      setReceiverType("e-mail");
    } else {
      setReceiverType("SMS");
    }
  }, [inputType, btnText]);

  return (
    <div className="recover-account">
      <div>
        <h3>Recuperar minha conta</h3>
        <p>Receba um {receiverType} para confirmar que é você</p>
      </div>
      <form>
        <EmailOrPasswordInput
          ref={emailOrPasswordInputRef}
          btnText={btnText}
          inputType={inputType}
          onClick={toggleType}
        />
        <div>
          <button type="submit">Enviar</button>
          <Link href="/auth/logar">Voltar</Link>
        </div>
      </form>
    </div>
  );
}
