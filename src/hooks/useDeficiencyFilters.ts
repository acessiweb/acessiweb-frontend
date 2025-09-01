"use client";

import { FilterHandler } from "@/types/filter";
import { ChangeEvent } from "react";
import { StringParam, useQueryParams, withDefault } from "use-query-params";

function findDeficiency(
  deficiency: string,
  defaultValues?: { id: string; name: string }[]
): string {
  if (defaultValues && defaultValues.length > 0) {
    const found = defaultValues.find(
      (val) => val.name.toLowerCase() === deficiency.toLowerCase()
    );
    if (found) return found.name;
  }
  return "";
}

type DeficiencyFiltersProps = Partial<FilterHandler> & {
  defaultValues?: { id: string; name: string }[] | undefined;
};

export default function useDeficiencyFilters({
  defaultValues,
  handleFiltering,
}: DeficiencyFiltersProps) {
  const [filters, setFilters] = useQueryParams({
    visual: withDefault(StringParam, findDeficiency("visual", defaultValues)),
    motor: withDefault(StringParam, findDeficiency("motora", defaultValues)),
    hearing: withDefault(
      StringParam,
      findDeficiency("auditiva", defaultValues)
    ),
    neural: withDefault(
      StringParam,
      findDeficiency("cognitiva e neural", defaultValues)
    ),
    tea: withDefault(StringParam, findDeficiency("tea", defaultValues)),
  });

  const createHandlerCheckbox =
    (filterKey: keyof typeof filters) => (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setFilters(
        { [filterKey]: checked ? e.target.value : undefined },
        "replaceIn"
      );
      handleFiltering?.(true);
    };

  return {
    visual: filters.visual,
    handleVisual: createHandlerCheckbox("visual"),
    motor: filters.motor,
    handleMotor: createHandlerCheckbox("motor"),
    hearing: filters.hearing,
    handleHearing: createHandlerCheckbox("hearing"),
    neural: filters.neural,
    handleNeural: createHandlerCheckbox("neural"),
    tea: filters.tea,
    handleTea: createHandlerCheckbox("tea"),
  };
}
