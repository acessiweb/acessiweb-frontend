import { ReactNode } from "react";

export type CardProps = {
  registerId?: string;
  mainText: string;
  secondaryText?: string;
  children?: ReactNode;
};

export type CardLinkProps = CardProps & {
  readRoute: string;
};

export type CardBtnProps = CardProps & {
  onClick: () => void;
};

export type CardAddProps = {
  registerId: string;
  registerName: string;
  onAdd: (obj: { id: string; name: string }) => void;
};

export type CardDeleteProps = {
  registerId: string;
  registerName: string;
  onDelete: (id: string) => void;
};

export type CardUpdateAndDeleteProps = {
  registerId: string;
  registerName: string;
  onDelete: (id: string) => void;
  children?: ReactNode;
};

export type CardStatusProps = {
  status: "APPROVED" | "PENDING" | "REJECTED";
};

export type CardBtnUpdateAndDeleteProps = CardUpdateAndDeleteProps & {
  onUpdateClick: () => void;
};

export type CardLinkUpdateAndDeleteProps = CardUpdateAndDeleteProps & {
  updateRoute: string;
};
