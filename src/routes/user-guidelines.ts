import { ApiError, PaginationResponse } from "@/types/response-api";
import { getAuthSession } from "./auth-server-session";
import fetchData from "@/utils/fetch";
import { Guideline } from "@/types/guideline";

type Guidelines = PaginationResponse & {
  data: Guideline[];
};

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

export async function updateGuideline(
  userId: string,
  guidelineId: string,
  formData: FormData
): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `users/${userId}/guidelines/${guidelineId}`,
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
  userId: string,
  guidelineId: string
): Promise<ApiError | { id: string }> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `users/${userId}/guidelines/${guidelineId}`,
    config: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function getGuidelines(
  userId: string,
  query?: {
    deficiences?: string[];
    statusCode?: string;
    keyword?: string;
    initialDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
    isRequest?: boolean;
    isDeleted?: boolean;
  }
): Promise<Guidelines | ApiError> {
  const token = await getAuthSession();
  return await fetchData({
    endpoint: `users/${userId}/guidelines?keyword=${query?.keyword}&deficiences=${query?.deficiences}&limit=${query?.limit}&offset=${query?.offset}&isRequest=${query?.isRequest}&initialDate=${query?.initialDate}&endDate=${query?.endDate}&isDeleted=${query?.isDeleted}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function getGuideline(
  userId: string,
  id: string
): Promise<Guideline | ApiError> {
  const token = await getAuthSession();
  return await fetchData({
    endpoint: `users/${userId}/guidelines/${id}`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
