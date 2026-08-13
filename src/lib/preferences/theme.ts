const THEME_MODE_OPTIONS = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] as const;

export const THEME_MODE_VALUES = THEME_MODE_OPTIONS.map((o) => o.value);
export type ThemeMode = (typeof THEME_MODE_VALUES)[number];
export type ResolvedThemeMode = "light" | "dark";

// --- generated:themePresets:start ---

export const THEME_PRESET_OPTIONS = [
  {
    label: "Default",
    value: "default",
    primary: {
      light: "oklch(0.205 0 0)",
      dark: "oklch(0.922 0 0)",
    },
  },

  {
    label: "Airbnb (Design.md)",
    value: "airbnb",
    primary: {
      light: "#ff385c",
      dark: "#ff385c",
    },
  },
  {
    label: "Blossom",
    value: "blossom",
    primary: {
      light: "oklch(0.62 0.24 350)",
      dark: "oklch(0.68 0.22 350)",
    },
  },
  {
    label: "Ocean",
    value: "ocean",
    primary: {
      light: "oklch(0.6 0.15 250)",
      dark: "oklch(0.7 0.15 250)",
    },
  },
] as const;

export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.value);

export type ThemePreset = (typeof THEME_PRESET_OPTIONS)[number]["value"];

// --- generated:themePresets:end ---
