export type FiltersAvailable = "creation-date";

export type FilterType = {
  deleteFilter: (_id: FiltersAvailable) => void;
};

export type FilterOptions = {
  id: FiltersAvailable;
  desc: string;
}[];
