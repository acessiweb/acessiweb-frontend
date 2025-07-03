import { FilterType } from "@/types/filter";
import { ChangeEvent } from "react";
import { IoCloseOutline } from "react-icons/io5";

type DataFilterProps = FilterType & {
  initialDate: string;
  endDate: string;
  handleInitialDate: (_date: string) => void;
  handleEndDate: (_date: string) => void;
};

export default function DateFilter({
  deleteFilter,
  endDate,
  handleEndDate,
  handleInitialDate,
  initialDate,
}: DataFilterProps) {
  const handleChangeInitialDate = (e: ChangeEvent<HTMLInputElement>) => {
    handleInitialDate(e.currentTarget.value);
  };

  const handleChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    handleEndDate(e.currentTarget.value);
  };

  return (
    <div className="filters-applied__box">
      <form>
        <input
          type="date"
          id="initial-date"
          name="initial-date"
          onChange={handleChangeInitialDate}
          value={initialDate}
        />
        <input
          type="date"
          id="end-date"
          name="end-date"
          value={endDate}
          onChange={handleChangeEndDate}
        />
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
