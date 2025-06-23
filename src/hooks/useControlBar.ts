import { useState } from "react";

export default function useControlBar() {
  const [filtersChosen, setFiltersChosen] = useState<string[]>([]);
  const [view, setView] = useState("grid");

  const handleView = () => {
    setView((prev) => {
      if (prev === "list") {
        return "grid";
      }

      return "list";
    });
  };

  const handleFiltersChosen = (filterId: string) => {
    setFiltersChosen((prev) => {
      const newFilters = [...prev];
      newFilters.push(filterId);

      return newFilters;
    });
  };

  const deleteFilter = (filterId: string) => {
    setFiltersChosen((prev) => {
      const newFilters = [...prev];

      return newFilters.filter((f) => f !== filterId);
    });
  };

  const cleanFilters = () => {
    setFiltersChosen([]);
  };

  return {
    handleFiltersChosen,
    filtersChosen,
    handleView,
    view,
    deleteFilter,
    cleanFilters,
  };
}
