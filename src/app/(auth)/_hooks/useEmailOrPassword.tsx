"use client";

import { useState } from "react";

const EMAIL = "E-mail";
const MOBILEPHONE = "Celular";

export default function useEmailOrPassword() {
  const [inputType, setInputType] = useState(EMAIL);
  const [btnText, setBtnText] = useState(MOBILEPHONE);

  const toggleType = () => {
    setInputType((prev) => {
      if (prev === EMAIL) {
        return MOBILEPHONE;
      }

      return EMAIL;
    });

    setBtnText((prev) => {
      if (prev === EMAIL) {
        return MOBILEPHONE;
      }

      return EMAIL;
    });
  };

  return {
    inputType,
    btnText,
    toggleType,
    EMAIL,
    MOBILEPHONE,
  };
}
