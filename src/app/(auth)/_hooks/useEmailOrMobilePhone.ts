import { useState } from "react";

export default function useEmailOrMobilePhone() {
  const [inputType, setInputType] = useState<"E-mail" | "Celular">("E-mail");

  const handleType = () => {
    setInputType((prev) => {
      if (prev === "E-mail") {
        return "Celular";
      }

      return "E-mail";
    });
  };

  return { inputType, handleType };
}
