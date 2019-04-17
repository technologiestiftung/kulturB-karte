import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Link from '~/components/Link';
import markdown from '~/../texts/info.md';

import SidebarTitle from '../SidebarTitle';
import SidebarText from '../SidebarText';

const ImprintWrapper = styled.div`
  margin-top: 10px;

  a {
    font-size: 12px;
  }
`;

const Heading = props => <SidebarTitle>{props.children}</SidebarTitle>;
const Paragraph = props => <SidebarText>{props.children}</SidebarText>;

class SidebarInfo extends PureComponent {
  render() {
    return (
      <Fragment>
        <ReactMarkdown
          source={markdown}
          renderers={{
            heading: Heading,
            paragraph: Paragraph
          }}
        />
        <ImprintWrapper>
          <Link target="_blank" href="https://kultur-b-digital.de/impressum">Impressum</Link> · <Link target="_blank" href="https://kultur-b-digital.de/datenschutz">Datenschutz</Link>
        </ImprintWrapper>
      </Fragment>
    );
  }
}

export default SidebarInfo;
