import { useState } from "react";

export function useKeyboard() {
  const [showKeyboard, setShowKeyboard] = useState(false);

  const toggleKeyboard = () => {
    setShowKeyboard((prev) => !prev);
  };

  return { showKeyboard, toggleKeyboard };
}
