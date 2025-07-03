import { ReactNode } from "react";

type FiltersAppliedProps = {
  filtersChosen: string[];
  cleanFilters: () => void;
  children: ReactNode;
};

export default function FiltersApplied({
  cleanFilters,
  children,
  filtersChosen,
}: FiltersAppliedProps) {
  return (
    <div className="filters-applied">
      {children}
      {filtersChosen.length > 0 && (
        <button onClick={cleanFilters}>Limpar todos</button>
      )}
    </div>
  );
}
