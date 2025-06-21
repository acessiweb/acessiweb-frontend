import { ApiError } from "@/types/response-api";
import { useState } from "react";

type ErrorMsgsProps = {
  alertMsg?: string | undefined;
};

export default function useErrorMsgs({ alertMsg }: ErrorMsgsProps = {}) {
  const [errorMsgs, setErrorMsgs] = useState<ApiError | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(alertMsg);

  const ErrorsMsgs = () => {
    return (
      <div
        className="error-msgs-container"
        role={alertMsg ? "alert" : "status"}
      >
        {errorMsgs &&
          errorMsgs.errors &&
          errorMsgs.errors.map((ve, i) => (
            <p className="error-msgs-container__error-msg" key={i}>
              {"❌" + ve.message}
            </p>
          ))}
        {errorMsg && (
          <p className="error-msgs-container__error-msg">{"❌" + errorMsg}</p>
        )}
      </div>
    );
  };

  const handleErrorMsg = (msg: string) => {
    setErrorMsgs(null);
    setErrorMsg(msg);
  };

  const handleErrorMsgs = (e: ApiError) => {
    setErrorMsg("");
    setErrorMsgs(e);
  };

  return {
    ErrorsMsgs,
    handleErrorMsg,
    handleErrorMsgs,
  };
}
