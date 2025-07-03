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

  return {
    handleInitialDate,
    handleEndDate,
    initialDate,
    endDate,
  };
}
