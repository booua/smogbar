import React, { createContext, useState } from "react";
const { ipcRenderer } = window.require("electron");

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  let savedTheme = ipcRenderer && ipcRenderer.sendSync("getSavedTheme");

  let theme = true;
  if (savedTheme) {
    theme = savedTheme === "dark" ? true : false;
  }
  const [darkTheme, setDarkTheme] = useState(theme);

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
    const currentTheme = !darkTheme ? "dark" : "light";
    let saveTheme = ipcRenderer && ipcRenderer.sendSync("saveTheme", currentTheme);
    console.log(saveTheme, currentTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
