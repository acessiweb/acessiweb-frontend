import fetchData from "@/utils/fetch";
import { Guideline } from "@/types/guideline";
import { ApiError, PaginationResponse } from "@/types/response-api";

type Guidelines = PaginationResponse & {
  data: Guideline[];
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
}): Promise<Guidelines | ApiError> {
  return await fetchData({
    endpoint: `guidelines?keyword=${query?.keyword}&deficiences=${query?.deficiences}&limit=${query?.limit}&offset=${query?.offset}&initialDate=${query?.initialDate}&endDate=${query?.endDate}&statusCode=${query?.statusCode}&isRequest=${query?.isRequest}`,
  });
}

// export async function updateGuideline(
//   guidelineId: string,
//   formData: FormData
// ): Promise<ApiError | { id: string }> {
//   const token = await getAuthSession();

//   return fetchData({
//     endpoint: `guidelines/${guidelineId}`,
//     config: {
//       method: "PUT",
//       body: formData,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   });
// }
