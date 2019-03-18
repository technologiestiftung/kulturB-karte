import styled from 'styled-components';
import TSBLogoSrc from '!file-loader!~/../public/images/tsb-logo.svg'; // eslint-disable-line
import TSBLogoSmallSrc from '!file-loader!~/../public/images/tsb-logo-s.svg'; // eslint-disable-line

const TSBLogo = styled.a.attrs({
  href: 'https://kultur-b-digital.de',
  target: '_blank'
})`
  display: block;
  background-image: url(${TSBLogoSmallSrc});
  width: 200px;
  height: 62px;
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1000;

  @media screen and (min-width: 768px) {
    background-image: url(${TSBLogoSrc});
    width: 230px;
    height: 64px;
  }

  @media screen and (min-width: 1024px) {
    width: 320px;
    height: 90px;
  }
`;

export default TSBLogo;
