"use client";

import { DeficiencyFiltersQueryProps } from "@/types/deficiency";
import { findDeficiency } from "@/utils/find-deficiency";
import { ChangeEvent } from "react";
import { StringParam, useQueryParams, withDefault } from "use-query-params";

export default function useDeficiencyFilters({
  defaultValues,
  handleFiltering,
}: DeficiencyFiltersQueryProps) {
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
