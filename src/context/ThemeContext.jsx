import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Light theme configiration
const lightTheme = {
  palette: {
    mode: "light",
    primary: { main: "rgba(27, 40, 27, 1)" }, // Normal text & icon color
    secondary: { main: "rgba(53, 121, 55, 1)" }, // Button color
    background: { default: "#fff", paper: "rgba(238, 246, 239, 1)" }, // Background color
    button: { bg: "rgba(53, 121, 55, 0.16)", color: "rgba(53, 121, 55, 1)" }, // Button styles
    text: {
      primary: "rgba(27, 40, 27, 1)",
      secondary: "rgba(20, 46, 21, 0.62)",
    }, // Text color, header color
    checkbox: { main: "rgba(63, 145, 66, 1)" }, // Checkbox color
    input: { text: "rgba(27, 40, 27, 1)" }, // Input text color
    chart: {
      primary: "rgba(63, 145, 66, 1)",
      secondary: "rgba(20, 46, 21, 1)",
    },
  },
};

// Dark theme configuration
const darkTheme = {
  palette: {
    mode: "dark",
    primary: { main: "#ffffff" }, // Normal text & icon color
    secondary: { main: "rgba(207, 207, 207, 1)" }, // Button color
    background: {
      default: "rgba(35, 35, 35, 1)",
      paper: "rgba(44, 44, 44, 1)",
    }, // Dark background
    button: { bg: "rgba(52, 113, 54, 1)", color: "rgba(207, 207, 207, 1)" }, // Button styles
    text: { primary: "#ffffff", secondary: "rgba(151, 246, 155, 0.71)" }, // Text color, header color
    checkbox: { main: "rgba(63, 145, 66, 1)" },
    input: { text: "#ffffff" },
    chart: {
      primary: "rgba(63, 145, 66, 1)",
      secondary: "rgba(160, 237, 164, 1)",
    },
  },
};

const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || false);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProviderWrapper, ThemeContext };
