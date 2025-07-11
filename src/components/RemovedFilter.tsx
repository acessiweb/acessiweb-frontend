import { IoCloseOutline } from "react-icons/io5";

type RemovedFilterProps = {
  onClick: () => void;
  desc: string;
};

export default function RemovedFilter({ desc, onClick }: RemovedFilterProps) {
  return (
    <div className="filters-applied__box">
      <span>{desc}</span>
      <button
        type="button"
        className="filters-applied__delete--one cursor-pointer"
        onClick={onClick}
      >
        <IoCloseOutline
          className="cursor-pointer"
          aria-hidden={true}
          focusable={false}
        />
      </button>
    </div>
  );
}
