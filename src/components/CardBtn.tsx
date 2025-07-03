"use client";

import CardAdd from "@/components/card/Add";
import CardDelete from "@/components/card/Delete";
import CardStatus from "@/components/card/Status";
import { CardBtnUpdateAndDeleteEl } from "@/components/card/UpdateAndDelete";
import {
  CardAddProps,
  CardBtnProps,
  CardBtnUpdateAndDeleteProps,
  CardDeleteProps,
  CardStatusProps,
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

export function CardBtnStatus({
  mainText,
  onClick,
  registerId,
  secondaryText,
  status,
}: CardBtnProps & CardStatusProps) {
  return (
    <CardBase
      mainText={mainText}
      onClick={onClick}
      registerId={registerId}
      secondaryText={secondaryText}
    >
      <CardStatus status={status} />
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
      <div
        className="card__content"
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick(e)}
        tabIndex={0}
        role="button"
        aria-label={`Clique para acessar ${mainText}`}
      >
        <h3 className="heading-3">{mainText}</h3>
        {secondaryText && <p>{secondaryText}</p>}
      </div>
      {children}
    </article>
  );
}
