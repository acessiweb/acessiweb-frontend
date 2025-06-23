"use client";

import CardAdd from "@/common/card/add";
import CardDelete from "@/common/card/delete";
import { CardLinkUpdateAndDeleteEl } from "@/common/card/update-and-delete";
import {
  CardAddProps,
  CardDeleteProps,
  CardLinkProps,
  CardLinkUpdateAndDeleteProps,
} from "@/types/card";
import Link from "next/link";

export function CardLink({ readRoute, mainText, children }: CardLinkProps) {
  return (
    <CardBase mainText={mainText} readRoute={readRoute}>
      {children}
    </CardBase>
  );
}

export function CardLinkDelete({
  mainText,
  onDelete,
  secondaryText,
  registerId,
  registerName,
  readRoute,
}: CardLinkProps & CardDeleteProps) {
  return (
    <CardBase
      mainText={mainText}
      secondaryText={secondaryText}
      readRoute={readRoute}
    >
      <CardDelete
        onDelete={onDelete}
        registerId={registerId}
        registerName={registerName}
      />
    </CardBase>
  );
}

export function CardLinkAdd({
  mainText,
  secondaryText,
  registerId,
  registerName,
  onAdd,
  readRoute,
}: CardLinkProps & CardAddProps) {
  return (
    <CardBase
      mainText={mainText}
      secondaryText={secondaryText}
      readRoute={readRoute}
    >
      <CardAdd
        onAdd={onAdd}
        registerId={registerId}
        registerName={registerName}
      />
    </CardBase>
  );
}

export function CardLinkUpdateAndDelete({
  mainText,
  registerId,
  registerName,
  onDelete,
  secondaryText,
  updateRoute,
  readRoute,
}: CardLinkProps & CardLinkUpdateAndDeleteProps) {
  return (
    <CardBase
      mainText={mainText}
      secondaryText={secondaryText}
      readRoute={readRoute}
    >
      <CardLinkUpdateAndDeleteEl
        onDelete={onDelete}
        registerId={registerId}
        registerName={registerName}
        updateRoute={updateRoute}
      />
    </CardBase>
  );
}

function CardBase({
  mainText,
  secondaryText,
  children,
  readRoute,
}: CardLinkProps) {
  return (
    <article className="card">
      <Link className="card__desc" href={readRoute}>
        <span>{mainText}</span>
        {secondaryText && <span>{secondaryText}</span>}
      </Link>
      {children}
    </article>
  );
}
