"use client";

import { AddBtnProps } from "@/types/card";
import { BsCartPlus } from "react-icons/bs";

export function AddBtn({ onAdd, registerId, registerName }: AddBtnProps) {
  return (
    <button
      type="button"
      className="btn-transparent cursor-pointer"
      onClick={() => onAdd({ id: registerId, name: registerName })}
      aria-label="Ação de incluir"
    >
      <BsCartPlus
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
    </button>
  );
}
