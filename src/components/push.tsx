"use client";

import { usePush } from "@/context/push";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export default function Push() {
  const { pushMsg, setShowPush, setPushMsg } = usePush();
  const [onMount, setOnMount] = useState(false);

  useEffect(() => {
    setOnMount(true);
  }, []);

  const clear = () => {
    setPushMsg("");
    setShowPush(false);
  };

  useEffect(() => {
    setTimeout(() => {
      clear();
    }, 4500);
  }, [onMount]);

  return (
    <div className="push slide-fwd-top">
      <p>{pushMsg}</p>
      <button onClick={() => clear()} className="btn-transparent">
        <ClearIcon />
      </button>
    </div>
  );
}
