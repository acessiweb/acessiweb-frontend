"use server";

import { ApiError, PaginationResponse } from "@/types/response-api";
import fetchData from "./fetch/fetch";
import { Guideline } from "@/types/guideline";
import { getAuthSession } from "./auth-session/auth-server-session";

type Guidelines = PaginationResponse & {
  data: Guideline[];
};

export async function getGuidelines(query?: {
  userId?: string;
  deficiences?: string[];
  statusCode?: string;
  keyword?: string;
  initialDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
  isRequest?: boolean;
}): Promise<Guidelines | ApiError> {
  return await fetchData({
    endpoint: `guidelines?keyword=${query?.keyword}&deficiences=${query?.deficiences}&limit=${query?.limit}&offset=${query?.offset}&isRequest=${query?.isRequest}`,
  });
}

export async function getGuideline(id: string): Promise<Guideline | ApiError> {
  return await fetchData({
    endpoint: `guidelines/${id}`,
  });
}

export async function createGuideline(
  userId: string,
  formData: FormData
): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `users/${userId}/guidelines`,
    config: {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
