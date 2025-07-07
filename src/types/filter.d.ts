export type FiltersAvailable = "creation-date" | "deleted";

export type FilterType = {
  deleteFilter: (_id: FiltersAvailable) => void;
};

export type FilterOptions = {
  id: FiltersAvailable;
  desc: string;
}[];

export type FilterHandler = {
  handleFiltering: (_isFiltering: boolean) => void;
};
