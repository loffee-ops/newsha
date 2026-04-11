import { createGlobalStyle } from "styled-components";
import montserratFont from "../assets/fonts/Montserrat.ttf";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Montserrat";
    src: url(${montserratFont}) format("truetype");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
  }

  html,
  body {
    overscroll-behavior: contain;
  }

  body {
    min-height: 100vh;
    font-family: "Montserrat", system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    background: #ffffff;
    position: relative;
    color: #111111;
  }

  #root {
    position: relative;
    z-index: 1;
    isolation: isolate;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.35s ease;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
    color: inherit;
  }

  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  *::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
