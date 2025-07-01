export type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export type ParamsPromise = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
