import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { ReactElement, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { SlMicrophone } from "react-icons/sl";

type InputTextVoice = {
  children: ReactElement<HTMLInputElement>;
  useWatchName: string;
  handleSetValue: (_name: string, _value: string) => void;
  context?: "general" | "email" | "password" | "url" | "username";
  keycut: string;
};

export default function InputTextVoice({
  children,
  useWatchName,
  handleSetValue,
  context = "general",
  keycut,
}: InputTextVoice) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { startListening } = useSpeechRecognition({
    onResult: (text: string) => {
      handleSetValue(useWatchName, text);
    },
    context,
    inputId: useWatchName,
    btnRef,
  });
  useHotkeys(keycut, startListening);

  return (
    <div className="input-text-voice">
      {children}
      <button
        className="btn-icon"
        type="button"
        onClick={startListening}
        aria-label="Escrever por comando de voz"
        title={`${keycut} ${keycut.replace("alt", "option")}`}
        ref={btnRef}
      >
        <SlMicrophone aria-hidden={true} focusable={false} />
      </button>
    </div>
  );
}
