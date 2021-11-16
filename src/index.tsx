import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import "typeface-nunito-sans";
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    fontFamily: "Nunito Sans"
  }
});


ReactDOM.render(
  <div style={{ margin: 10 }}>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </div>,
  document.getElementById("root")
);
