import React, { ReactNode } from "react";

type EmailorMobilePhoneInputProps = {
  btnText: string;
  onClick: () => void;
  children: ReactNode;
};

export default function EmailorMobilePhoneInput({
  onClick,
  children,
  btnText,
}: EmailorMobilePhoneInputProps) {
  return (
    <div className="email-or-password-input">
      {children}
      <button
        type="button"
        onClick={onClick}
        accessKey="S"
        className="email-or-password-input__toggle"
      >
        {btnText}
      </button>
    </div>
  );
}
