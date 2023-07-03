import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0;
    color: white;
  }

  *:focus {
    outline: none;
  }

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
  }

  h2 {
    margin: 0 0 16px 0;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  }

  div, p {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }

  a {
    font-weight: 400;
    font-size: 14px;
    text-decoration: none;
    color: inherit;
  }

  hr {
    width: 95%;
    height: 2px;
    background-color: #a0a0a0;
    margin: 12px auto;
  }

  svg, img {
    display: inline-block;
    vertical-align: middle;
  }

  .highlight {
    color: green;
    font-weight: 700;
  }


  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .rotating {
    animation: rotation 1.5s infinite linear;
  }
`;
