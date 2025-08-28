import { GuidelineStatus } from "./guideline";

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
