import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { createRoot } from "react-dom/client";

export function captureVoiceAndPrintText(inputId: string) {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const micBtn = document.querySelector(`#${inputId} + .btn-default`);

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
      root.render(<MicNoneOutlinedIcon />);
    }
  };

  recognition.start();

  elementRecording();

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const text = event.results[0][0].transcript;
    const input = document.getElementById(inputId) as HTMLInputElement;
    input.value = text;

    elementDefault();
    recognition.stop();
  };

  recognition.onerror = (e: any) => {
    recognition.abort();
    console.error("Erro no reconhecimento de voz:", e.error);
    elementDefault();
  };
}
