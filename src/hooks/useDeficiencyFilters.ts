import { ChangeEvent, useState } from "react";

function findDeficiency(
  deficiency: string,
  defaultValues?: { id: string; name: string }[]
): string {
  if (defaultValues && defaultValues.length > 0) {
    const found = defaultValues.find(
      (val) => val.name.toLowerCase() === deficiency.toLowerCase()
    );

    if (found) return found.name;

    return "";
  }

  return "";
}

export default function useDeficiencyFilters({
  defaultValues,
}: {
  defaultValues?: { id: string; name: string }[] | undefined;
} = {}) {
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
