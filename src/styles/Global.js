/* eslint-disable global-require */
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    position: relative;
    font-family: 'ClanPro', Helvetica, sans-serif;
    color: #222;
    line-height: 1.4;
  }

  body, html, #root {
    height: 100%;
    width: 100%;
  }

  #root {
    position: fixed;
    overflow: hidden;
  }
`;
