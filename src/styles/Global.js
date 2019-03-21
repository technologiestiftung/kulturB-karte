/* eslint-disable global-require */
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: 'ClanPro';
    src: url(${require('./fonts/ClanWebPro-News.eot')});
    src: url(${require('./fonts/ClanWebPro-News.eot?#iefix')}) format('embedded-opentype'), url(${require('./fonts/ClanWebPro-News.woff')}) format('woff');
    font-weight: 400;
  }
  @font-face {
    font-family: 'ClanPro';
    src: url(${require('./fonts/ClanWebPro-NewsItalic.eot')});
    src: url(${require('./fonts/ClanWebPro-NewsItalic.eot?#iefix')}) format('embedded-opentype'), url(${require('./fonts/ClanWebPro-NewsItalic.woff')}) format('woff');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: 'ClanPro';
    src: url(${require('./fonts/ClanWebPro-Medium.eot')});
    src: url(${require('./fonts/ClanWebPro-Medium.eot?#iefix')}) format('embedded-opentype'), url(${require('./fonts/ClanWebPro-Medium.woff')}) format('woff');
    font-weight: 600;
  }
  @font-face {
    font-family: 'ClanPro';
    src: url(${require('./fonts/ClanWebPro-MediumItalic.eot')});
    src: url(${require('./fonts/ClanWebPro-MediumItalic.eot?#iefix')}) format('embedded-opentype'), url(${require('./fonts/ClanWebPro-MediumItalic.woff')}) format('woff');
    font-weight: 600;
    font-style: italic;
  }
  @font-face {
    font-family: 'ClanPro';
    src: url(${require('./fonts/ClanWebPro-Bold.eot')});
    src: url(${require('./fonts/ClanWebPro-Bold.eot?#iefix')}) format('embedded-opentype'), url(${require('./fonts/ClanWebPro-Bold.woff')}) format('woff');
    font-weight: 800;
  }
  @font-face {
    font-family: 'ClanPro';
    src: url(${require('./fonts/ClanWebPro-BoldItalic.eot')});
    src: url(${require('./fonts/ClanWebPro-BoldItalic.eot?#iefix')}) format('embedded-opentype'), url(${require('./fonts/ClanWebPro-BoldItalic.woff')}) format('woff');
    font-weight: 800;
    font-style: italic;
  }

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
