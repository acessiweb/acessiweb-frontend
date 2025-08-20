"use client";

import { BsCheck2Square } from "react-icons/bs";
import { CardStatusProps } from "@/types/card";
import { BsClock } from "react-icons/bs";
import { IoHourglassOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

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
        <IoHourglassOutline aria-hidden={true} focusable={false} />
      </div>
    );
  } else if (status === "STANDBY") {
    return (
      <div
        aria-label="Situação aguardando"
        className="btn-transparent"
        title="Aguardando"
      >
        <BsClock aria-hidden={true} focusable={false} />
      </div>
    );
  } else {
    return (
      <div aria-label="Situação rejeitada" className="btn-transparent">
        <IoCloseOutline aria-hidden={true} focusable={false} />
      </div>
    );
  }
}
