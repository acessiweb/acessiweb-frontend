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

export type ApiError = {
  message: string;
  statusCode: number;
  errors: {
    message: string;
    errorCode: string;
    fields: string[];
    httpErrorCode: string;
  }[];
};
