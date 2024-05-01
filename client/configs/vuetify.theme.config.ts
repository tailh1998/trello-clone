import { type ThemeDefinition } from "vuetify"
import { shades, deepOrange, orange } from "vuetify/util/colors"

const DEFAULT_THEME: ThemeDefinition = {
  dark: false,
  colors: {
    primary: shades.white,
    secondary: deepOrange.base,
    background: "#FFFFFF",
    surface: "#FFFFFF",
    "primary-darken-1": "#3700B3",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: shades.white,
    success: "#4CAF50",
    warning: "#FB8C00",
    appBar: "#1565c0",
    boardBar: "#1976d2",
    boardColumn: "#ebecf0",
    access: shades.white
  }
}

const DARK_THEME: ThemeDefinition = {
  dark: true,
  colors: {
    primary: shades.white,
    secondary: orange.base,
    appBar: "#2c3e50",
    boardBar: "#34495e",
    boardColumn: "#333643",
    access: "#212121"
  }
}

const config = {
  defaults: {
    VBtn: {
      color: "primary",
      variant: "outlined",
      style: "text-transform: none;"
    },
    VTextField: {
      variant: "outlined"
    }
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      light: DEFAULT_THEME,
      dark: DARK_THEME
    }
  }
}

export default config
