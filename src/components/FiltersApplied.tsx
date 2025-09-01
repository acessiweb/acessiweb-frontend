import { ReactNode } from "react";

type FiltersAppliedProps = {
  filtersChosen: string[];
  cleanFilters: () => void;
  children: ReactNode;
  handleFilters: () => void;
};

export default function FiltersApplied({
  cleanFilters,
  children,
  filtersChosen,
  handleFilters,
}: FiltersAppliedProps) {
  const handleCleanFilters = () => {
    handleFilters();
    cleanFilters();
  };

  return (
    <div className="filters-applied">
      {children}
      {filtersChosen.length > 0 && (
        <button
          className="btn-default cursor-pointer"
          onClick={handleCleanFilters}
        >
          Limpar todos
        </button>
      )}
    </div>
  );
}
