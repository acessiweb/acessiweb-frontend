import { SlMicrophone } from "react-icons/sl";
import { createRoot } from "react-dom/client";

export function captureVoiceAndPrintText(
  inputId: string,
  registerName?: string,
  setValue?: any
) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const micBtn = document.querySelector(`#${inputId}`)?.closest("button");

  const elementRecording = () => {
    if (micBtn) {
      micBtn.replaceChildren();
      const div = document.createElement("div");
      const span1 = document.createElement("span");
      span1.classList.add("bubble");
      const span2 = document.createElement("span");
      span2.classList.add("bubble");
      const span3 = document.createElement("span");
      span3.classList.add("bubble");
      div.classList.add("bubbles-loading");
      div.appendChild(span1);
      div.appendChild(span2);
      div.appendChild(span3);
      micBtn.appendChild(div);
    }
  };

  const elementDefault = () => {
    if (micBtn) {
      const root = createRoot(micBtn);
      micBtn.replaceChildren();
      root.render(<SlMicrophone />);
    }
  };

  recognition.start();

  elementRecording();

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const text = event.results[0][0].transcript;
    const input = document.getElementById(inputId) as HTMLInputElement;
    setValue(registerName, text);
    input.value = text;

    elementDefault();
    recognition.stop();
  };

  recognition.onerror = (e) => {
    recognition.abort();
    console.error("Erro no reconhecimento de voz:", e.error);
    elementDefault();
  };
}
