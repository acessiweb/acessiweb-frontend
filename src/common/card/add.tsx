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
      title="Adicionar"
      className="btn-transparent"
      onClick={() => onAdd({ id: registerId, name: registerName })}
    >
      <BsCartPlus />
    </button>
  );
}
