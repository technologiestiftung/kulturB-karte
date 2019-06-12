import React from 'react';
import styled from 'styled-components';
import TSBLogoSrc from '!file-loader!~/../public/images/kbd_logo_header.svg'; // eslint-disable-line

const TSBLogo = styled.a.attrs({
  href: 'https://kultur-b-digital.de',
  target: '_blank'
})`
  display: block;
  width: 250px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;

  @media screen and (min-width: 768px) {
    width: 360px;
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
