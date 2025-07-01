"use server";

type FetchDataParams = {
  endpoint: string;
  config?: RequestInit;
};

export default async function fetchData({ endpoint, config }: FetchDataParams) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/${endpoint}`,
    config
  );

  return await response.json();
}
