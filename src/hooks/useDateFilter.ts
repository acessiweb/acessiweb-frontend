"use client";

import { StringParam, useQueryParam } from "use-query-params";

export default function useDateFilter() {
  const [initialDate, setInitialDate] = useQueryParam(
    "initialDate",
    StringParam
  );
  const [endDate, setEndDate] = useQueryParam("endDate", StringParam);

  const handleInitialDate = (date: string) => {
    setInitialDate(date === "" ? undefined : date, "replaceIn");
  };

  const handleEndDate = (date: string) => {
    setEndDate(date === "" ? undefined : date, "replaceIn");
  };

  const cleanDateFilter = () => {
    handleInitialDate("");
    handleEndDate("");
  };

  return {
    handleInitialDate,
    handleEndDate,
    initialDate: initialDate || "",
    endDate: endDate || "",
    cleanDateFilter,
  };
}
