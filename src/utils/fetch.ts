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

  if (response.ok) {
    return {
      ok: response.ok,
      data: { ...responseJSON },
    };
  }

  return {
    ok: response.ok,
    ...responseJSON,
  };
}
