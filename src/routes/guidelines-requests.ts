"use server";

import fetchData from "@/utils/fetch";
import { Guideline } from "@/types/guideline";
import { ApiError, FetchResponse, PaginationResponse } from "@/types/fetch";
import { getAuthSession } from "./auth-server-session";

type FetchGuidelines = FetchResponse & {
  data: PaginationResponse & {
    data: Guideline[];
  };
};

type FetchUpdateResult = FetchResponse & {
  data: Guideline;
};

export async function getGuidelinesRequests(query?: {
  deficiences?: string[];
  keyword?: string;
  initialDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
  statusCode?: string;
  isRequest?: boolean;
}): Promise<FetchGuidelines | ApiError> {
  const token = await getAuthSession();

  return await fetchData({
    endpoint: `guidelines-requests?keyword=${query?.keyword}&deficiences=${query?.deficiences}&limit=${query?.limit}&offset=${query?.offset}&initialDate=${query?.initialDate}&endDate=${query?.endDate}&statusCode=${query?.statusCode}&isRequest=${query?.isRequest}`,
    config: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });
}

export async function updateGuidelineStatus(
  guidelineId: string,
  statusCode?: string,
  statusMsg?: string
): Promise<FetchUpdateResult | ApiError> {
  const token = await getAuthSession();

  return fetchData({
    endpoint: `guidelines-requests/${guidelineId}`,
    config: {
      method: "PATCH",
      body: JSON.stringify({
        statusCode,
        statusMsg,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });
}
