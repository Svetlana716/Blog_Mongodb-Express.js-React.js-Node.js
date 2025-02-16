import { useLayoutEffect, useState } from "react";

export const useTheme = () => {
  const isDarkTheme = window?.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [darkTheme, setDarkTheme] = useState(
    !!localStorage.getItem("isDarkTheme") || isDarkTheme
  );

  useLayoutEffect(() => {
    localStorage.setItem("isDarkTheme", darkTheme.toString());
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme, isDarkTheme]);

  return { darkTheme, setDarkTheme: () => setDarkTheme((prev) => !prev) };
};
