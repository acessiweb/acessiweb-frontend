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

  const handleArrayOfMsgs = (err: string[]) => {
    setErrorMsgs(err);
  };

  const handleUniqueMsg = (err: string) => {
    setErrorMsgs([err]);
  };

  const handleApiErrors = (err: ApiError[]) => {
    const errs = [];
    for (const e of err) {
      errs.push(e.message);
    }
    setErrorMsgs(errs);
  };

  return {
    handleUniqueMsg,
    handleApiErrors,
    handleArrayOfMsgs,
    errorMsgs,
    isAlert: alertMsg ? true : false,
  };
}
