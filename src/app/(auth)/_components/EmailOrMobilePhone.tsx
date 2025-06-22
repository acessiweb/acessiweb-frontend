import React, { ReactNode } from "react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

const EMAIL = "E-mail";
const MOBILEPHONE = "Celular";

type EmailorMobilePhoneProps = {
  handleType: () => void;
  children: ReactNode;
  type: "E-mail" | "Celular";
};

export default function EmailorMobilePhone({
  children,
  handleType,
  type,
}: EmailorMobilePhoneProps) {
  useHotkeys("L", handleType);

  return (
    <div className="email-or-mobile-phone">
      {children}
      <button
        type="button"
        onClick={handleType}
        className="email-or-mobile-phone__toggle"
        title="Pressione a tecla L"
        aria-keyshortcuts="L"
        aria-label={`Mudar para ${type === "E-mail" ? "Celular" : "E-mail"}`}
      >
        {type === "Celular" ? "E-mail" : "Celular"}
      </button>
    </div>
  );
}
