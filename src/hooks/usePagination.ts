import { PaginationResponse } from "@/types/response-api";
import { useState } from "react";

type PaginationProps<T> = Partial<PaginationResponse> & {
  data?: T[];
};

function hasIdProperty<T>(item: T): item is T & { id: string } {
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    typeof item.id === "string"
  );
}

export default function usePagination<T>({ data = [] }: PaginationProps<T>) {
  const [isFiltering, setIsFiltering] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [loadLess, setLoadLess] = useState(false);
  const [offset, setOffset] = useState(0);
  const [store, setStore] = useState(data);

  const onLoadMore = (offset: number = 0) => {
    setOffset(offset);
    setLoadMore(true);
    setLoadLess(false);
    setIsFiltering(false);
  };

  const onLoadLess = (limit: number = 0) => {
    setOffset((off) => off - limit);
    setLoadMore(false);
    setLoadLess(true);
    setIsFiltering(false);
  };

  const handleMore = (newData: PaginationProps<T>) => {
    setStore((stored) => {
      const prevStored = [...stored];
      newData.data!.map((d) => prevStored.push(d));
      return prevStored;
    });
  };

  const handleLess = (newData: PaginationProps<T>) => {
    setStore((stored) => {
      const prevStored = [...stored];
      newData.data!.splice(store.length - (store.length - newData.limit!));
      return prevStored;
    });
  };

  const handleStore = (newData: PaginationProps<T>) => {
    if (store.length === 0 || isFiltering) {
      setStore(newData.data || []);
    }

    if (loadMore) {
      handleMore(newData);
    }

    if (loadLess) {
      handleLess(newData);
    }
  };

  const handleDelete = (deletedId: string) => {
    setStore((prev) => {
      const prevCopy = [...prev];
      return prevCopy.filter((dt) => {
        if (hasIdProperty(dt)) {
          return dt.id !== deletedId;
        }

        return;
      });
    });
  };

  const handleFiltering = (isFiltering: boolean) => {
    setIsFiltering(isFiltering);
  };

  return {
    onLoadLess,
    onLoadMore,
    isFiltering,
    offset,
    store,
    handleStore,
    handleDelete,
    handleFiltering,
  };
}
