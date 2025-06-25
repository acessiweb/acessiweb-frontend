"use client";

import Link from "next/link";
import CardDelete from "./delete";
import { SlPencil } from "react-icons/sl";
import {
  CardBtnUpdateAndDeleteProps,
  CardLinkUpdateAndDeleteProps,
  CardUpdateAndDeleteProps,
} from "@/types/card";

export function CardLinkUpdateAndDeleteEl({
  onDelete,
  registerId,
  registerName,
  updateRoute,
}: CardLinkUpdateAndDeleteProps) {
  return (
    <CardUpdateAndDelete
      onDelete={onDelete}
      registerId={registerId}
      registerName={registerName}
    >
      <Link
        href={updateRoute}
        className="btn-transparent"
        aria-label="Ir para a tela de edição"
      >
        <SlPencil aria-hidden={true} focusable={false} />
      </Link>
    </CardUpdateAndDelete>
  );
}

export function CardBtnUpdateAndDeleteEl({
  onDelete,
  onUpdateClick,
  registerId,
  registerName,
}: CardBtnUpdateAndDeleteProps) {
  return (
    <CardUpdateAndDelete
      onDelete={onDelete}
      registerId={registerId}
      registerName={registerName}
    >
      <button
        type="button"
        className="btn-transparent"
        onClick={onUpdateClick}
        aria-label="Abrir tela de edição"
      >
        <SlPencil aria-hidden={true} focusable={false} />
      </button>
    </CardUpdateAndDelete>
  );
}

function CardUpdateAndDelete({
  onDelete,
  registerId,
  registerName,
  children,
}: CardUpdateAndDeleteProps) {
  return (
    <div style={{ display: "flex" }}>
      {children}
      <CardDelete
        onDelete={onDelete}
        registerId={registerId}
        registerName={registerName}
      />
    </div>
  );
}
