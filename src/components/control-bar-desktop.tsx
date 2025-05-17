import Link from "next/link";
import { ReactNode } from "react";

type ControlBarProps = {
  createBtnText?: string;
  createBtnLink?: string;
  searchPlaceholderText: string;
  controls: ReactNode;
};

export default function ControlBarDesktop({
  createBtnLink,
  createBtnText,
  controls,
}: ControlBarProps) {
  return (
    <div className="control-bar control-bar-desktop">
      {controls}
      {createBtnLink && (
        <Link className="btn-link-default" href={createBtnLink}>
          {createBtnText}
        </Link>
      )}
    </div>
  );
}
