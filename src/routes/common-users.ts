"use server";

import { CreateCommonUserSchema } from "@/schemas/user.schema";
import fetchData from "./fetch/fetch";

export async function createAccount(body: Partial<CreateCommonUserSchema>) {
  return await fetchData({
    endpoint: "common-users",
    config: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  });
}
