import React, { PureComponent, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

import markdown from '~/../texts/info.md';

import SidebarTitle from '../SidebarTitle';
import SidebarText from '../SidebarText';

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
      </Fragment>
    );
  }
}

export default SidebarInfo;
