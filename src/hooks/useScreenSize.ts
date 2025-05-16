import { useEffect, useState } from "react";

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setScreenSize({
      width: screen.width,
      height: screen.height,
    });
  }, []);

  return {
    screenSize,
  };
}
