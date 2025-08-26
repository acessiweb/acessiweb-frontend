"use server";

import Guidelines from "../../_components/Guidelines";

export default async function Page() {
  return <Guidelines isAdmin={true} isRequest={true} />;
}
