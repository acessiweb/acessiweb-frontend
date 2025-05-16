import Link from "next/link";
import Search from "./search";

type ControlBarProps = {
  createBtnText?: string;
  createBtnLink?: string;
  searchPlaceholderText: string;
};

export default function ControlBarDesktop({
  createBtnLink,
  createBtnText,
  searchPlaceholderText,
}: ControlBarProps) {
  return (
    <div className="control-bar control-bar-desktop">
      <div className="control-bar-desktop__controls">
        <Search classname="search" placeholderText={searchPlaceholderText} />
      </div>
      {createBtnLink && (
        <Link className="btn-link-default" href={createBtnLink}>
          {createBtnText}
        </Link>
      )}
    </div>
  );
}
