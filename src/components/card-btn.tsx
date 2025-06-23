"use client";

import CardAdd from "@/common/card/add";
import CardDelete from "@/common/card/delete";
import { CardBtnUpdateAndDeleteEl } from "@/common/card/update-and-delete";
import {
  CardAddProps,
  CardBtnProps,
  CardBtnUpdateAndDeleteProps,
  CardDeleteProps,
} from "@/types/card";

export function CardBtnDelete({
  mainText,
  onDelete,
  secondaryText,
  registerId,
  registerName,
  onClick,
}: CardBtnProps & CardDeleteProps) {
  return (
    <CardBase
      mainText={mainText}
      secondaryText={secondaryText}
      onClick={onClick}
    >
      <CardDelete
        onDelete={onDelete}
        registerId={registerId}
        registerName={registerName}
      />
    </CardBase>
  );
}

export function CardBtnAdd({
  mainText,
  secondaryText,
  registerId,
  registerName,
  onClick,
  onAdd,
}: CardBtnProps & CardAddProps) {
  return (
    <CardBase
      mainText={mainText}
      secondaryText={secondaryText}
      onClick={onClick}
    >
      <CardAdd
        onAdd={onAdd}
        registerId={registerId}
        registerName={registerName}
      />
    </CardBase>
  );
}

export function CardBtnUpdateAndDelete({
  mainText,
  onClick,
  registerId,
  registerName,
  onUpdateClick,
  onDelete,
  secondaryText,
}: CardBtnProps & CardBtnUpdateAndDeleteProps) {
  return (
    <CardBase
      mainText={mainText}
      secondaryText={secondaryText}
      onClick={onClick}
    >
      <CardBtnUpdateAndDeleteEl
        onDelete={onDelete}
        registerId={registerId}
        registerName={registerName}
        onUpdateClick={onUpdateClick}
      />
    </CardBase>
  );
}

function CardBase({
  mainText,
  secondaryText,
  children,
  onClick,
}: CardBtnProps) {
  return (
    <article className="card">
      <div className="card__desc" onClick={onClick}>
        <span>{mainText}</span>
        {secondaryText && <span>{secondaryText}</span>}
      </div>
      {children}
    </article>
  );
}
