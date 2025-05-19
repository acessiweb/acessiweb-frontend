import { MOBILE_SCREEN_SIZE, TABLET_SCREEN_SIZE } from "./var";

export function isMobile() {
  return screen.width <= MOBILE_SCREEN_SIZE;
}

export function isTablet() {
  return screen.width <= TABLET_SCREEN_SIZE;
}

export function isDesktop() {
  return screen.width > TABLET_SCREEN_SIZE;
}
