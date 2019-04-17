import React from 'react';
import styled from 'styled-components';
import TSBLogoSrc from '!file-loader!~/../public/images/kulturBdigital-Visual.png'; // eslint-disable-line

const TSBLogo = styled.a.attrs({
  href: 'https://kultur-b-digital.de',
  target: '_blank'
})`
  display: block;
  width: 200px;
  height: 62px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;

  @media screen and (min-width: 768px) {
    width: 230px;
    height: 64px;
  }

  img {
    width: 100%;
  }
`;

export default () => (
  <TSBLogo>
    <img src={TSBLogoSrc} alt="TSB Logo" />
  </TSBLogo>
);
