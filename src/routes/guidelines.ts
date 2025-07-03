"use server";

import { ApiError, PaginationResponse } from "@/types/response-api";
import fetchData from "../utils/fetch";
import { Guideline } from "@/types/guideline";

type Guidelines = PaginationResponse & {
  data: Guideline[];
};

export async function getGuidelines(query?: {
  userId?: string;
  deficiences?: string[];
  statusCode?: string;
  keyword?: string;
  initialDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
  isRequest?: boolean;
}): Promise<Guidelines | ApiError> {
  return await fetchData({
    endpoint: `guidelines?keyword=${query?.keyword}&deficiences=${query?.deficiences}&limit=${query?.limit}&offset=${query?.offset}&isRequest=${query?.isRequest}&initialDate=${query?.initialDate}&endDate=${query?.endDate}`,
  });
}

export async function getGuideline(id: string): Promise<Guideline | ApiError> {
  return await fetchData({
    endpoint: `guidelines/${id}`,
  });
}
