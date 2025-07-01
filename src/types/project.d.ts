import { Guideline } from "./guideline";

export type Project = {
  id: string;
  name: string;
  description: string;
  feedback?: string;
  guidelines: Guideline[];
};
