export type Guideline = {
  id: string;
  name: string;
  description: string;
  code?: string;
  image?: string;
  imageDesc?: string;
  deficiences?: {
    id: string;
    name: string;
  }[];
  statusCode?: "APPROVED" | "PENDING" | "REJECTED";
};
