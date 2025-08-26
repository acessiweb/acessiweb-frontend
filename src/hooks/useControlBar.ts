"use client";

import { FiltersAvailable } from "@/types/filter";
import { useState } from "react";

export default function useControlBar() {
  const [filtersChosen, setFiltersChosen] = useState<Array<FiltersAvailable>>(
    []
  );
  const [view, setView] = useState("grid");

  const handleView = () => {
    setView((prev) => {
      if (prev === "list") {
        return "grid";
      }

      return "list";
    });
  };

  const handleFiltersChosen = (filterId: FiltersAvailable) => {
    setFiltersChosen((prev) => {
      const newFilters = [...prev];
      newFilters.push(filterId);

      return newFilters;
    });
  };

  const deleteFilter = (filterId: FiltersAvailable) => {
    setFiltersChosen((prev) => {
      const newFilters = [...prev];

      return newFilters.filter((f) => f !== filterId);
    });
  };

  const cleanFilters = () => {
    setFiltersChosen([]);
  };

  const isFilterApplied = (filterId: FiltersAvailable) => {
    return filtersChosen.some((f) => f === filterId);
  };

  return {
    handleFiltersChosen,
    filtersChosen,
    handleView,
    view,
    deleteFilter,
    cleanFilters,
    isFilterApplied,
  };
}
