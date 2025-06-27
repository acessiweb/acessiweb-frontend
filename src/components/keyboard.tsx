import useInputFocus from "@/hooks/useInputFocus";
import { default as ReactSimpleKeyboard } from "react-simple-keyboard";
import { KeyboardDisplay } from "@/utils/enum";

type KeyboardProps = {
  isKeyboardOpened: boolean;
};

export default function Keyboard({ isKeyboardOpened }: KeyboardProps) {
  const { handleKeyboardKeyPress } = useInputFocus();

  return (
    <>
      <ReactSimpleKeyboard
        onKeyPress={handleKeyboardKeyPress}
        display={KeyboardDisplay}
      />
      <span role="status" className="sr-only">
        {isKeyboardOpened
          ? "Teclado virtual aberto"
          : "Teclado virtual fechado"}
      </span>
    </>
  );
}
