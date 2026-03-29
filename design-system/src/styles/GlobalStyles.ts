import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: "Montserrat";
    src: url("/fonts/Montserrat.ttf") format("truetype");
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
  body {
    width: 100%;
    height: 100%;
    overscroll-behavior: contain;
    
  }

  body {
    font-family: "Montserrat", system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    background: #f5f6f8;
    position: relative;
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
