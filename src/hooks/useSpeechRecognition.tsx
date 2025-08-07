import { SlMicrophone } from "react-icons/sl";
import { createRoot } from "react-dom/client";
import { RefObject, useRef, useState } from "react";
import { symbolMap } from "@/utils/constants";

type UseSpeechRecognitionOptions = {
  inputId: string;
  context?: "general" | "email" | "password" | "url" | "username";
  onResult?: (text: string) => void;
  btnRef: RefObject<HTMLButtonElement | null>;
};

type UseSpeechRecognitionReturn = {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  error: string | null;
};

function processVoiceInput(
  transcript: string,
  context: "general" | "email" | "password" | "url" | "username"
): string {
  let processedText = transcript.toLowerCase().trim();

  Object.entries(symbolMap).map(([spoken, symbol]) => {
    const variations = [` ${spoken} `, `${spoken} `, ` ${spoken}`, `${spoken}`];

    const variation = variations.find((variation) =>
      processedText.includes(variation)
    );

    processedText = processedText.replace(variation!, symbol);
  });

  if (context === "email" || context === "password") {
    processedText = processedText.replaceAll(" ", "");
  }

  return processedText;
}

export default function useSpeechRecognition({
  context = "general",
  onResult,
  inputId,
  btnRef,
}: UseSpeechRecognitionOptions): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition não é suportado neste navegador");
      return;
    }

    const root = createRoot(btnRef.current!);

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);

      root.render(
        <div className="bubbles-loading" aria-label="Escutando...">
          <span aria-hidden={true} className="bubble"></span>
          <span aria-hidden={true} className="bubble"></span>
          <span aria-hidden={true} className="bubble"></span>
        </div>
      );
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const rawText = event.results[0][0].transcript;
      const processedText = processVoiceInput(rawText, context);
      setTranscript(processedText);
      const inputRef = document.getElementById(inputId);
      if (inputRef) {
        inputRef.textContent = processedText;
        inputRef.dispatchEvent(new Event("change", { bubbles: true }));
        inputRef.dispatchEvent(new Event("input", { bubbles: true }));
      }
      onResult?.(processedText);
      setIsListening(false);
      recognition.stop();
    };

    recognition.onerror = (e) => {
      setError(`Erro no reconhecimento de voz: ${e.error}`);
      setIsListening(false);
      recognition.abort();
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef?.current?.stop();
      root.render(<SlMicrophone aria-hidden={true} focusable={false} />);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return {
    isListening,
    transcript,
    startListening,
    error,
  };
}
