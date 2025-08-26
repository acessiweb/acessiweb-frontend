"use client";

import { AlertMsgs } from "@/types/error";
import { ApiError } from "@/types/fetch";
import { useState } from "react";

type ErrorsProps = {
  alertMsg?: AlertMsgs;
};

export default function useErrors({ alertMsg }: ErrorsProps = {}) {
  const [errorMsgs, setErrorMsgs] = useState<string[]>(() => {
    if (alertMsg) {
      switch (alertMsg) {
        case "AccessDenied":
          return [
            "Ocorreu um erro: Não foi possível realizar a autenticação. Tente novamente.",
          ];
        case "GoogleAuthError":
          return [
            "Ocorreu um erro: Não foi possível autenticar com o serviço Google. Tente novamente.",
          ];
        default:
          return [];
      }
    }
    return [];
  });

  const handleArrayOfMsgs = (err: string[]) => {
    setErrorMsgs(err);
  };

  const handleUniqueMsg = (err: string) => {
    setErrorMsgs([err]);
  };

  const handleApiErrors = (err: ApiError) => {
    const errs = [];
    for (const e of err.errors) {
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
