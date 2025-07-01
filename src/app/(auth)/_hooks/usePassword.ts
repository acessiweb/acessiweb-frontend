import { useState } from "react";

export default function usePassword() {
  const [hide, setHide] = useState(true);

  const handlePassword = () => {
    setHide((prev) => !prev);
  };

  return {
    handlePassword,
    hide,
  };
}
