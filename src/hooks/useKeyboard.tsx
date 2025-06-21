import useInputFocus from "@/hooks/useInputFocus";
import { useHotkeys } from "react-hotkeys-hook";
import { default as ReactSimpleKeyboard } from "react-simple-keyboard";
import { KeyboardDisplay } from "@/common/utils/enum";
import { useState } from "react";

export default function useKeyboard() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { handleKeyboardKeyPress } = useInputFocus();
  useHotkeys("T", () => setShowKeyboard((prev) => !prev));

  const Keyboard = () => {
    return (
      <>
        {showKeyboard && (
          <ReactSimpleKeyboard
            onKeyPress={handleKeyboardKeyPress}
            display={KeyboardDisplay}
          />
        )}
        <span role="status" className="sr-only">
          {showKeyboard ? "Teclado virtual aberto" : "Teclado virtual fechado"}
        </span>
      </>
    );
  };

  return {
    keyboard: Keyboard,
    setShowKeyboard,
  };
}
