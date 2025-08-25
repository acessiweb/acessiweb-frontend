"use client";

import { RestoreBtnProps } from "@/types/card";
import { MdRestore } from "react-icons/md";

export default function RestoreBtn({ onRestore }: RestoreBtnProps) {
  return (
    <button
      type="button"
      className="btn-transparent cursor-pointer"
      aria-label="Ação de restaurar"
      onClick={onRestore}
    >
      <MdRestore
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
    </button>
  );
}
