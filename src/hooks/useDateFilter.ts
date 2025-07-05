import { useState } from "react";

export default function useDateFilter() {
  const [initialDate, setInitialDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleInitialDate = (date: string) => {
    setInitialDate(date);
  };

  const handleEndDate = (date: string) => {
    setEndDate(date);
  };

  const cleanDateFilter = () => {
    handleInitialDate("");
    handleEndDate("");
  };

  return {
    handleInitialDate,
    handleEndDate,
    initialDate,
    endDate,
    cleanDateFilter,
  };
}
