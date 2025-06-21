import { useEffect, useState } from "react";

export default function usePagination({
  watchFromSearch = [],
}: {
  watchFromSearch: string[];
}) {
  const [isFromSearch, setIsFromSearch] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const onLoadMore = (offset: number = 0) => {
    setOffset(offset);
    setLoadMore(true);
    setIsFromSearch(false);
  };

  const onLoadLess = (limit: number = 0) => {
    setOffset((off) => off - limit);
    setLoadMore(false);
    setIsFromSearch(false);
  };

  useEffect(() => {
    if (watchFromSearch.some((val) => val)) setIsFromSearch(true);
  }, [...watchFromSearch]);

  return {
    onLoadLess,
    onLoadMore,
    isFromSearch,
    loadMore,
    offset,
  };
}
