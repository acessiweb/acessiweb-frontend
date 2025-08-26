export type PartialPaginationResponse = {
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
  offset: number;
};

export type PaginationResponse = PartialPaginationResponse & {
  total: number;
  limit: number;
};

export type FetchResponse = {
  ok: boolean;
};

export type ApiError = FetchResponse & {
  message: string;
  statusCode: number;
  errors: {
    message: string;
    errorCode: string;
    fields: string[];
    httpErrorCode: number;
  }[];
};

export type FetchUpdateResult = FetchResponse & {
  data: {
    id: string;
  };
};
