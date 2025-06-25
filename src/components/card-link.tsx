"use client";

import CardAdd from "@/components/card/add";
import CardDelete from "@/components/card/delete";
import CardStatus from "@/components/card/status";
import { CardLinkUpdateAndDeleteEl } from "@/components/card/update-and-delete";
import {
  CardAddProps,
  CardDeleteProps,
  CardLinkProps,
  CardLinkUpdateAndDeleteProps,
  CardStatusProps,
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

export function CardBtnStatus({
  mainText,
  registerId,
  secondaryText,
  status,
  readRoute,
}: CardLinkProps & CardStatusProps) {
  return (
    <CardBase
      mainText={mainText}
      registerId={registerId}
      secondaryText={secondaryText}
      readRoute={readRoute}
    >
      <CardStatus status={status} />
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
        <h3 className="heading-3">{mainText}</h3>
        {secondaryText && <p>{secondaryText}</p>}
      </Link>
      {children}
    </article>
  );
}
