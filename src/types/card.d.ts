import { ReactNode } from "react";
import { GuidelineStatus } from "./guideline";

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
  onClick: (_e) => void;
};

export type AddBtnProps = {
  registerId: string;
  registerName: string;
  onAdd: (obj: { id: string; name: string }) => void;
};

export type DeleteBtnProps = {
  registerId: string;
  registerName: string;
  onDelete: (id: string) => void;
};

export type StatusBtnProps = {
  status: GuidelineStatus | undefined;
};

export type RestoreBtnProps = {
  onRestore: () => void;
};
