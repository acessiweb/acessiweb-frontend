import useInputFocus from "@/hooks/useInputFocus";
import { default as ReactSimpleKeyboard } from "react-simple-keyboard";
import { KeyboardDisplay } from "@/utils/enum";

type KeyboardProps = {
  showKeyboard: boolean;
};

export default function Keyboard({ showKeyboard }: KeyboardProps) {
  const { handleKeyboardKeyPress } = useInputFocus();

  return (
    <>
      <ReactSimpleKeyboard
        onKeyPress={handleKeyboardKeyPress}
        display={KeyboardDisplay}
      />
      <span role="status" className="sr-only">
        {showKeyboard ? "Teclado virtual aberto" : "Teclado virtual fechado"}
      </span>
    </>
  );
}
