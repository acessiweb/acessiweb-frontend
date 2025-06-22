import { ParamsPromise } from "@/types/params";
import Login from "./login";

export default async function Page({ searchParams }: ParamsPromise) {
  const queryParams = await searchParams;
  return <Login searchParams={queryParams} />;
}
