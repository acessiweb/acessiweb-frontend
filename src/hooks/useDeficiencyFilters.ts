import { ChangeEvent, useState } from "react";

export default function useDeficiencyFilters() {
  const [visual, setVisual] = useState("");
  const [motor, setMotor] = useState("");
  const [hearing, setHearing] = useState("");
  const [neural, setNeural] = useState("");
  const [tea, setTea] = useState("");

  const createHandlerCheckbox =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setter(checked ? e.target.value : "");
    };

  return {
    visual,
    handleVisual: createHandlerCheckbox(setVisual),
    motor,
    handleMotor: createHandlerCheckbox(setMotor),
    hearing,
    handleHearing: createHandlerCheckbox(setHearing),
    neural,
    handleNeural: createHandlerCheckbox(setNeural),
    tea,
    handleTea: createHandlerCheckbox(setTea),
  };
}
