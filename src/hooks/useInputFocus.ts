import { useCallback, useEffect, useState } from "react";

export default function useInputFocus() {
  const [target, setTarget] = useState<HTMLInputElement>();

  const handleFocus = useCallback((e: FocusEvent) => {
    const t = e.target as HTMLInputElement;
    setTarget(t);
  }, []);

  const handleBlur = useCallback((e: FocusEvent) => {
    const t = e.target as HTMLInputElement;
    setTarget(t);
  }, []);

  const handleKeyboardKeyPress = (button: string) => {
    if (target) {
      if (button === "{bksp}") {
        target.value = target.value.slice(0, -1);
      } else if (button === "{space}") {
        target.value = target.value + " ";
      } else {
        if (!["{shift}", "{lock}"].includes(button)) {
          target.value += button;
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, [handleFocus, handleBlur]);

  return {
    handleKeyboardKeyPress,
  };
}
