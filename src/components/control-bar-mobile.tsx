"use client";

import { LuListFilter } from "react-icons/lu";
// import { IoFilterOutline } from "react-icons/io5";
// import { CiFilter } from "react-icons/ci";
import { TbArrowsSort } from "react-icons/tb";
import Link from "next/link";

type ControlBarProps = {
  createBtnText?: string;
  createBtnLink?: string;
};

export default function ControlBarMobile({
  createBtnLink,
  createBtnText,
}: ControlBarProps) {
  return (
    <div className="control-bar control-bar-mobile">
      <div className="control-bar-mobile__controls">
        <button className="btn-icon">
          <LuListFilter />
        </button>
        <button className="btn-icon">
          <TbArrowsSort />
        </button>
      </div>
      {createBtnLink && (
        <Link className="btn-link-default" href={createBtnLink}>
          {createBtnText}
        </Link>
      )}
    </div>
  );
}
