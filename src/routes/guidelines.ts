"use server";

import { ApiError, PaginationResponse } from "@/types/response-api";
import fetchData from "@/utils/fetch";
import { Guideline } from "@/types/guideline";
import { getAuthSession } from "./auth-server-session";

type Guidelines = PaginationResponse & {
  data: Guideline[];
};

export async function getGuidelines(query?: {
  deficiences?: string[];
  keyword?: string;
  initialDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
  isDeleted?: boolean;
}): Promise<Guidelines | ApiError> {
  return await fetchData({
    endpoint: `guidelines?keyword=${query?.keyword}&deficiences=${query?.deficiences}&limit=${query?.limit}&offset=${query?.offset}&initialDate=${query?.initialDate}&endDate=${query?.endDate}&isDeleted=${query?.isDeleted}`,
  });
}

export async function getGuideline(id: string): Promise<Guideline | ApiError> {
  return await fetchData({
    endpoint: `guidelines/${id}`,
  });
}

export async function createGuideline(
  formData: FormData
): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: "guidelines",
    config: {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function updateGuideline(
  guidelineId: string,
  formData: FormData
): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `guidelines/${guidelineId}`,
    config: {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function deleteGuideline(
  guidelineId: string
): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `guidelines/${guidelineId}`,
    config: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
