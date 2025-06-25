"use client";

import { BsCheck2Square } from "react-icons/bs";
import { CardStatusProps } from "@/types/card";
import { BsClock } from "react-icons/bs";

export default function CardStatus({ status }: CardStatusProps) {
  if (status === "APPROVED") {
    return (
      <div aria-label="Situação aprovada" className="btn-transparent">
        <BsCheck2Square aria-hidden={true} focusable={false} />
      </div>
    );
  } else if (status === "PENDING") {
    return (
      <div aria-label="Situação pendente" className="btn-transparent">
        <BsClock aria-hidden={true} focusable={false} />
      </div>
    );
  }
}
