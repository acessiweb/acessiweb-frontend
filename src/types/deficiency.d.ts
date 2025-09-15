type DeficiencyFilters = {
  defaultValues?: { id: string; name: string }[] | undefined;
};

export type DeficiencyFiltersQueryProps = Partial<FilterHandler> &
  DeficiencyFilters;

export type DeficiencyFiltersProps = DeficiencyFilters;
