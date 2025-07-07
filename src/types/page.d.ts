export type Page = {
  crumbs?: {
    desc: string;
    link: string;
  }[];
  isSecPage?: boolean;
  handleSecPageTitle?: (title: string) => void;
  isEditPage?: boolean;
};
