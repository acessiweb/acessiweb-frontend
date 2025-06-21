import { ChangeEvent, useState } from "react";

export default function useFilters() {
  const [search, setSearch] = useState("");
  const [visual, setVisual] = useState("");
  const [motor, setMotor] = useState("");
  const [hearing, setHearing] = useState("");
  const [neural, setNeural] = useState("");
  const [tea, setTea] = useState("");

  const createHandlerText =
    (setter: (value: string) => void) => (text: string) => {
      setter(text);
    };

  const createHandlerCheckbox =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setter(checked ? e.target.value : "");
    };

  return {
    search,
    handleSearch: createHandlerText(setSearch),
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
