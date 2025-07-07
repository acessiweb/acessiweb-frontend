"use client";

import { CardRestoreProps } from "@/types/card";
import { MdRestore } from "react-icons/md";

export default function CardRestore({ onRestore }: CardRestoreProps) {
  return (
    <button
      type="button"
      className="btn-transparent"
      aria-label="Ação de restaurar"
      onClick={onRestore}
    >
      <MdRestore aria-hidden={true} focusable={false} />
    </button>
  );
}
