import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoYoutube
} from 'react-icons/io';

const SocialMediaWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  font-size: 18px;

  a {
    color: ${props => props.theme.colors.textgrey};
  }
`;

const SocialItem = styled.a`
  margin-left: 5px;
`;

class SocialMedia extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <SocialMediaWrapper>
        {data.facebook && <SocialItem href={data.facebook} target="_blank" alt="facebook"><IoLogoFacebook /></SocialItem>}
        {data.twitter && <SocialItem href={data.twitter} target="_blank" alt="twitter"><IoLogoTwitter /></SocialItem>}
        {data.instagram && <SocialItem href={data.instagram} target="_blank" alt="instagram"><IoLogoInstagram /></SocialItem>}
        {data.youtube && <SocialItem href={data.youtube} target="_blank" alt="youtube"><IoLogoYoutube /></SocialItem>}
      </SocialMediaWrapper>
    );
  }
}

export default SocialMedia;
