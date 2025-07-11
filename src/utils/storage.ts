"use client";

const LOCAL_STORAGE_KEY = "acessiweb-prefs";

type Prefs = {
  theme: string;
  font: string;
  fontSize: string;
  brightness: string;
  lineSpace: string;
  letterSpace: string;
  cursorSize: string;
  cursorColor: string;
};

export function savePreference<K extends keyof Prefs>(
  type: K,
  value: string | number
) {
  if (typeof window === "undefined") return;

  const prefs = getPreferences();

  if (prefs) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...prefs,
        [type]: value,
      })
    );
  }

  const newPrefs = getPreferences();
  document.body.className = "";

  if (newPrefs) {
    Object.values(newPrefs).map((val) => document.body.classList.add(val));
  }
}

export function setPreferences() {
  if (typeof window === "undefined") return;

  const prefs = getPreferences();
  document.body.className = "";

  if (!prefs) {
    const defaultPrefs = {
      theme: "light",
      font: "tahoma",
      fontSize: "fs-small",
      brightness: "brightness-100",
      lineSpace: "line-space-15",
      letterSpace: "letter-space-12",
      cursorSize: "cursor-small",
      cursorColor: "cursor-black",
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultPrefs));
    Object.values(defaultPrefs).map((val) => document.body.classList.add(val));
  } else {
    Object.values(prefs).map((val) => document.body.classList.add(val));
  }
}

export function getPreferences(): Prefs | undefined {
  if (typeof window === "undefined") return;
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
}
