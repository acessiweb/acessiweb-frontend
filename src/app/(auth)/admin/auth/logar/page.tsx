import { ParamsPromise } from "@/types/params";
import Login from "./login";

type PageProps = ParamsPromise;

export default async function Page({ searchParams }: PageProps) {
  const seaParams = await searchParams;
  return <Login searchParams={seaParams} />;
}
