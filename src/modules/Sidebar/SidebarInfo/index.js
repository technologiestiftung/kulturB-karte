import React, { PureComponent, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

import Link from '~/components/Link';
import markdown from '~/../texts/info.md';

import SidebarTitle from '../SidebarTitle';
import SidebarText from '../SidebarText';

const Heading = props => <SidebarTitle>{props.children}</SidebarTitle>;
const Paragraph = props => <SidebarText>{props.children}</SidebarText>;
const LinkRenderer = props => <Link target="_blank" href={props.href}>{props.children}</Link>;
const ImageRenderer = props => <img alt="" width="200" src={props.src} />;

class SidebarInfo extends PureComponent {
  render() {
    return (
      <Fragment>
        <ReactMarkdown
          source={markdown}
          renderers={{
            heading: Heading,
            paragraph: Paragraph,
            link: LinkRenderer,
            image: ImageRenderer
          }}
        />
      </Fragment>
    );
  }
}

export default SidebarInfo;
