"use client";

import { BsCartPlus } from "react-icons/bs";

type CardAddProps = {
  registerId: string;
  registerName: string;
  onAdd: (obj: { id: string; name: string }) => void;
};

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
