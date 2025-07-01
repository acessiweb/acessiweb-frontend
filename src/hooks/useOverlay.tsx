import { useState } from "react";
import { createPortal } from "react-dom";

function Overlay() {
  return createPortal(
    <div id="overlay"></div>,
    document.getElementById("app")!
  );
}

export default function useOverlay() {
  const [isActive, setIsActive] = useState(false);

  return {
    isActive,
    setIsActive,
    Overlay,
  };
}
