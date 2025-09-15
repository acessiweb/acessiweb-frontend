import { DeficiencyFiltersProps } from "@/types/deficiency";
import { findDeficiency } from "@/utils/find-deficiency";
import { ChangeEvent, useState } from "react";

export default function useDeficiencyFilters({
  defaultValues,
}: DeficiencyFiltersProps) {
  const [visual, setVisual] = useState(() => {
    return findDeficiency("visual", defaultValues);
  });
  const [motor, setMotor] = useState(() => {
    return findDeficiency("motora", defaultValues);
  });
  const [hearing, setHearing] = useState(() => {
    return findDeficiency("auditiva", defaultValues);
  });
  const [neural, setNeural] = useState(() => {
    return findDeficiency("cognitiva e neural", defaultValues);
  });
  const [tea, setTea] = useState(() => {
    return findDeficiency("tea", defaultValues);
  });

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
