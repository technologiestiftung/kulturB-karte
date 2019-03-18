import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700,900|Roboto+Mono|Roboto+Slab');

  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    position: relative;
    font-family: 'Roboto Slab', serif;
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
