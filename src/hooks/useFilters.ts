import { ChangeEvent, useState } from "react";

export default function useFilters() {
  const [filtersChosen, setFiltersChosen] = useState<string[]>([]);

  const handleFiltersChosen = (filterId: string) => {
    setFiltersChosen((prev) => {
      const newFilters = [...prev];
      newFilters.push(filterId);

      return newFilters;
    });
  };

  return {
    handleFiltersChosen,
    filtersChosen,
  };
}
