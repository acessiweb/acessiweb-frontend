import { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

type FiltersAppliedProps = {
  filtersChosen: string[];
  deleteFilter: (_id: string) => void;
  children?: ReactNode;
  cleanFilters: () => void;
};

export default function FiltersApplied({
  filtersChosen,
  deleteFilter,
  cleanFilters,
}: FiltersAppliedProps) {
  return (
    <div className="filters-applied">
      {filtersChosen.map((f, i) => {
        if (f === "creation-date") {
          return (
            <div className="filters-applied__box">
              <form>
                <input type="date" />
                <input type="date" />
                <button
                  type="button"
                  className="filters-applied__delete--one"
                  onClick={() => deleteFilter("creation-date")}
                >
                  <IoCloseOutline />
                </button>
              </form>
            </div>
          );
        }

        return <div></div>;
      })}
      <button onClick={cleanFilters}>Limpar todos</button>
    </div>
  );
}
