"use client";

import { BsCheck2Square } from "react-icons/bs";
import { StatusBtnProps } from "@/types/card";
import { BsClock } from "react-icons/bs";
import { IoHourglassOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

export default function StatusBtn({ status }: StatusBtnProps) {
  if (status === "APPROVED") {
    return (
      <div
        aria-label="Situação aprovada"
        className="btn-transparent"
        title="Aprovada"
      >
        <BsCheck2Square aria-hidden={true} focusable={false} />
      </div>
    );
  } else if (status === "PENDING") {
    return (
      <div
        aria-label="Situação pendente"
        className="btn-transparent"
        title="Pendente de análise"
      >
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
      <div
        aria-label="Situação rejeitada"
        className="btn-transparent"
        title="Rejeitada"
      >
        <IoCloseOutline aria-hidden={true} focusable={false} />
      </div>
    );
  }
}
