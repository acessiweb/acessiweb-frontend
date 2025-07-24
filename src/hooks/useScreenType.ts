"use client";

import { useState, useEffect } from "react";

const MOBILE_SCREEN_SIZE = 499;
const TABLET_SCREEN_SIZE = 890;

function getScreenType() {
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
}

export function useScreenType() {
  const [screenType, setScreenType] = useState(() => getScreenType());

  const handleResize = () => {
    setScreenType(getScreenType());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return screenType;
}
