"use client";

import { CartType } from "@/types/cart";
import { Prefs } from "@/types/prefs";
import { setBodyClasses } from "./body";
import { compareArrays } from "./compare";

const LOCAL_STORAGE_PREFS = "acessiweb-prefs";
const LOCAL_STORAGE_CART = "acessiweb-cart";

const DEFAULT_PREFS = {
  theme: "light",
  font: "tahoma",
  fontSize: "fs-small",
  brightness: "brightness-100",
  lineSpace: "line-space-15",
  letterSpace: "letter-space-12",
  cursorSize: "cursor-small",
  cursorColor: "cursor-black",
};

const DEFAULT_CART = {
  name: "",
  description: "",
  guidelines: [],
};

//preferences
function savePreferences(prefs: Prefs) {
  localStorage.setItem(LOCAL_STORAGE_PREFS, JSON.stringify(prefs));
}

export function savePreference<K extends keyof Prefs>(
  type: K,
  value: string | number
) {
  if (typeof window === "undefined") return;

  const prefs = getPreferences();

  if (prefs) {
    savePreferences({
      ...prefs,
      [type]: value,
    });
  }

  const newPrefs = getPreferences();

  if (newPrefs) {
    setBodyClasses(newPrefs);
  }
}

export function getPreferences(): Prefs | undefined {
  if (typeof window === "undefined") return;

  const prefs = localStorage.getItem(LOCAL_STORAGE_PREFS);

  if (!prefs || prefs === "undefined") {
    setBodyClasses(DEFAULT_PREFS);
    savePreferences(DEFAULT_PREFS);
    return DEFAULT_PREFS;
  }

  const parsed = JSON.parse(prefs);

  if (
    typeof parsed !== "object" ||
    !compareArrays(Object.keys(parsed), Object.keys(DEFAULT_PREFS))
  ) {
    setBodyClasses(DEFAULT_PREFS);
    savePreferences(DEFAULT_PREFS);
    return DEFAULT_PREFS;
  }

  setBodyClasses(parsed);
  return parsed;
}

//cart
export function getCart(): CartType | undefined {
  if (typeof window === "undefined") return;

  const cart = localStorage.getItem(LOCAL_STORAGE_CART);

  if (!cart || cart === "undefined") {
    saveCart(DEFAULT_CART);
    return DEFAULT_CART;
  }

  const parsed = JSON.parse(cart);

  if (
    typeof parsed !== "object" ||
    !compareArrays(Object.keys(parsed), Object.keys(DEFAULT_CART))
  ) {
    saveCart(DEFAULT_CART);
    return DEFAULT_CART;
  }

  return parsed;
}

export function saveCart(cart: CartType) {
  localStorage.setItem("acessibiweb-cart", JSON.stringify(cart));
}
