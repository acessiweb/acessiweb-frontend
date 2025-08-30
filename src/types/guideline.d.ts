export type GuidelineStatus = "APPROVED" | "PENDING" | "REJECTED" | "STANDBY";

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
  statusCode?: GuidelineStatus;
  statusMsg?: string;
  isRequest: boolean;
  user: {
    username: string;
  };
};
