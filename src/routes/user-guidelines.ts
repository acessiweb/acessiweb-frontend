import { ApiError } from "@/types/response-api";
import { getAuthSession } from "./auth-server-session";
import fetchData from "@/utils/fetch";

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
