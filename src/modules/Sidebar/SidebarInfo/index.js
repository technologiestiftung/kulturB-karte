import React, { PureComponent, Fragment } from 'react';

import SidebarTitle from '../SidebarTitle';
import SidebarText from '../SidebarText';

class SidebarInfo extends PureComponent {
  render() {
    return (
      <Fragment>
        <SidebarTitle>
          Info
        </SidebarTitle>
        <SidebarText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </SidebarText>
      </Fragment>
    );
  }
}

export default SidebarInfo;
