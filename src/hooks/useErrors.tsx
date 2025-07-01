import { ApiError } from "@/types/response-api";
import { useState } from "react";

type ErrorsProps = {
  alertMsg?: string | undefined;
};

export default function useErrors({ alertMsg }: ErrorsProps = {}) {
  const [errorMsgs, setErrorMsgs] = useState<string[]>(() => {
    if (alertMsg) {
      return [alertMsg];
    }
    return [];
  });

  const handleErrorMsgs = (err: ApiError | string[] | string) => {
    if (typeof err === "string") {
      setErrorMsgs([err]);
    } else if (Array.isArray(err)) {
      setErrorMsgs(err);
    } else {
      const errs = [];
      for (const e of err.errors) {
        errs.push(e.message);
      }
      setErrorMsgs(errs);
    }
  };

  return {
    handleErrorMsgs,
    errorMsgs,
    isAlert: alertMsg ? true : false,
  };
}
