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
        className="filters-applied__delete--one"
        onClick={onClick}
      >
        <IoCloseOutline aria-hidden={true} focusable={false} />
      </button>
    </div>
  );
}
