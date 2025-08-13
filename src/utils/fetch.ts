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

  const responseJSON = await response.json();

  return {
    ok: response.ok,
    ...responseJSON,
  };
}
