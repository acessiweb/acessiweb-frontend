"use client";

import { CardAddProps } from "@/types/card";
import { BsCartPlus } from "react-icons/bs";

export default function CardAdd({
  onAdd,
  registerId,
  registerName,
}: CardAddProps) {
  return (
    <button
      type="button"
      className="btn-transparent"
      onClick={() => onAdd({ id: registerId, name: registerName })}
      aria-label="Ação de incluir"
    >
      <BsCartPlus aria-hidden={true} focusable={false} />
    </button>
  );
}
