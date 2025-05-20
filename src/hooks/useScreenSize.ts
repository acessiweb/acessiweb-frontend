import { MOBILE_SCREEN_SIZE, TABLET_SCREEN_SIZE } from "@/common/utils/var";
import { useState, useEffect } from "react";

export function useScreenType() {
  const [screenType, setScreenType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    function updateScreenType() {
      const width = screen.width;
      setScreenType({
        isMobile: width <= MOBILE_SCREEN_SIZE,
        isTablet: width <= TABLET_SCREEN_SIZE && width > MOBILE_SCREEN_SIZE,
        isDesktop: width > TABLET_SCREEN_SIZE,
      });
    }

    updateScreenType();
    window.addEventListener("resize", updateScreenType);

    return () => window.removeEventListener("resize", updateScreenType);
  }, []);

  return screenType;
}
