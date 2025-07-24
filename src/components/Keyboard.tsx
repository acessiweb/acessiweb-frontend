import useInputFocus from "@/hooks/useInputFocus";
import { default as ReactSimpleKeyboard } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

type KeyboardProps = {
  isKeyboardOpened: boolean;
};

const brazilianLayout = {
  default: [
    "' 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
    "{tab} q w e r t y u i o p ` [",
    "{lock} a s d f g h j k l ç ~ ]",
    "{shift} \\ z x c v b n m , . ; / {shift}",
    "{space}",
  ],
  shift: [
    '" ! @ # $ % ¨ & * ( ) _ + {bksp}',
    "{tab} Q W E R T Y U I O P ^ { }",
    "{lock} A S D F G H J K L Ç ^ }",
    "{shift} | Z X C V B N M < > : ? {shift}",
    "{space}",
  ],
};

export default function Keyboard({ isKeyboardOpened }: KeyboardProps) {
  const { handleKeyboardKeyPress } = useInputFocus();

  return (
    <>
      <ReactSimpleKeyboard
        onKeyPress={handleKeyboardKeyPress}
        layout={brazilianLayout}
        display={{
          "{bksp}": "⌫",
          "{tab}": "Tab",
          "{lock}": "Caps",
          "{shift}": "Shift",
          "{space}": "Espaço",
        }}
      />
      <span role="status" className="sr-only">
        {isKeyboardOpened
          ? "Teclado virtual aberto"
          : "Teclado virtual fechado"}
      </span>
    </>
  );
}
