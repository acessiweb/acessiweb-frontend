"use client";

import { usePush } from "@/context/push";
import { useCallback, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export default function Push() {
  const { pushMsg, setShowPush, setPushMsg } = usePush();

  const clear = useCallback(() => {
    setPushMsg("");
    setShowPush(false);
  }, [setPushMsg, setShowPush]);

  useEffect(() => {
    setTimeout(() => {
      clear();
    }, 5000);
  }, [clear]);

  return (
    <div className="push-wrapper slide-fwd-top">
      <div className="push-wrapper__push">
        <p>{pushMsg}</p>
        <button onClick={clear} className="btn-transparent">
          <ClearIcon />
        </button>
      </div>
    </div>
  );
}
