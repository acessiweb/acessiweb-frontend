import { FilterHandler } from "@/types/filter";
import { useState } from "react";

type SearchProps = FilterHandler;

export default function useSearch({ handleFiltering }: SearchProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
    handleFiltering(true);
  };

  return {
    handleSearch,
    search,
  };
}
