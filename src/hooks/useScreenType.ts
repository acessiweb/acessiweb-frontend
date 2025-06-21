"use client";

import { MOBILE_SCREEN_SIZE, TABLET_SCREEN_SIZE } from "@/common/utils/var";
import { useState, useEffect } from "react";

export function useScreenType() {
  const getScreenType = () => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
      };
    }

    const width = window.innerWidth;
    return {
      isMobile: width <= MOBILE_SCREEN_SIZE,
      isTablet: width > MOBILE_SCREEN_SIZE && width <= TABLET_SCREEN_SIZE,
      isDesktop: width > TABLET_SCREEN_SIZE,
    };
  };

  const [screenType, setScreenType] = useState(getScreenType);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setScreenType(getScreenType());

    const handleResize = () => {
      setScreenType(getScreenType());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isHydrated) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    };
  }

  return screenType;
}
