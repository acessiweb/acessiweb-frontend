"use client";

import { usePush } from "@/context/push";
import { ApiError, FetchUpdateResult, PaginationResponse } from "@/types/fetch";
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
  const { setPushMsg, setShowPush } = usePush();

  const onLoadMore = (offset: number = 0) => {
    setOffset(offset);
    setLoadMore(true);
    setLoadLess(false);
    setIsFiltering(false);
  };

  const onLoadLess = (limit: number = 0) => {
    setOffset((offset || 0) - limit);
    setLoadMore(false);
    setLoadLess(true);
    setIsFiltering(false);
  };

  const handleMore = (newData: PaginationProps<T>) => {
    setStore((stored) => {
      const prevStored = [...stored];

      if (newData.data) {
        newData.data.map((d) => prevStored.push(d));
      }

      return prevStored;
    });
  };

  const handleLess = (newData: PaginationProps<T>) => {
    setStore((stored) => {
      const prevStored = [...stored];

      if (newData.data && newData.limit) {
        const isDivisible = store.length % newData.limit === 0;
        let initialValue = store.length - newData.limit;

        if (!isDivisible) {
          const fit = Math.floor(store.length / newData.limit);
          initialValue = fit * newData.limit;
        }

        prevStored.splice(initialValue, store.length - 1);
      }

      return prevStored;
    });
  };

  const handlePagination = (newData: PaginationProps<T>) => {
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

  const handleDelete = async (
    id: string,
    deleteFunction: (id: string) => Promise<FetchUpdateResult | ApiError>
  ) => {
    const res = await deleteFunction(id);

    if (res.ok && "data" in res) {
      setStore((prev) => {
        const prevCopy = [...prev];
        return prevCopy.filter((dt) => {
          if (hasIdProperty(dt)) {
            return dt.id !== res.data.id;
          }

          return;
        });
      });
    }

    if (!res.ok && "errors" in res) {
      setShowPush(true);
      setPushMsg(res.errors[0].message);
    }
  };

  const handleFiltering = (isFiltering: boolean) => {
    setIsFiltering(isFiltering);
  };

  const updateItemFromStore = (data: T) => {
    setStore((prevStore: T[]) => {
      const storeCopy = [...prevStore];

      const newStore: T[] = storeCopy.map((item) => {
        if (hasIdProperty(item) && hasIdProperty(data) && item.id === data.id)
          return data;
        return item;
      });

      return newStore;
    });
  };

  return {
    onLoadLess,
    onLoadMore,
    isFiltering,
    offset,
    store,
    handlePagination,
    handleDelete,
    handleFiltering,
    updateItemFromStore,
  };
}
