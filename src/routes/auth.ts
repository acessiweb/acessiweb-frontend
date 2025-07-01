"use server";

import fetchData from "../utils/fetch";

export async function lookupUser({
  email,
  mobilePhone,
}: {
  email?: string;
  mobilePhone?: string;
}) {
  let query = "";

  if (email) {
    query += `email=${email}`;
  }

  if (mobilePhone) {
    query += `mobilePhone=${mobilePhone}`;
  }

  return await fetchData({
    endpoint: `auth/lookup?${query}`,
  });
}
