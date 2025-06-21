"use client";

import { BsCheck2Square } from "react-icons/bs";
import { CardStatusProps } from "@/types/card";
import { BsClock } from "react-icons/bs";

export default function CardStatus({ status }: CardStatusProps) {
  if (status === "APPROVED") {
    return (
      <div title="Aprovada" className="btn-transparent">
        <BsCheck2Square />
      </div>
    );
  } else if (status === "PENDING") {
    return (
      <div title="Pendente" className="btn-transparent">
        <BsClock />
      </div>
    );
  }
}
