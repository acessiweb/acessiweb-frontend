import React from "react";

type EmailOrPasswordInputProps = {
  inputType: string;
  btnText: string;
  onClick: () => void;
  ref: React.RefObject<HTMLInputElement | null>;
};

export default function EmailOrPasswordInput({
  onClick,
  inputType,
  btnText,
  ref,
}: EmailOrPasswordInputProps) {
  return (
    <div className="email-or-password-input">
      <input placeholder={inputType} ref={ref} />
      <button type="button" onClick={onClick}>
        {btnText}
      </button>
    </div>
  );
}
