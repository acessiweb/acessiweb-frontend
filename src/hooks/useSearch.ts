"use client";

import { FilterHandler } from "@/types/filter";
import { StringParam, useQueryParam } from "use-query-params";

type SearchProps = FilterHandler;

export default function useSearch({ handleFiltering }: SearchProps) {
  const [search, setSearch] = useQueryParam("search", StringParam);

  const handleSearch = (text: string) => {
    setSearch(text === "" ? undefined : text, "replaceIn");
    handleFiltering(true);
  };

  return {
    handleSearch,
    search: search || "",
  };
}
