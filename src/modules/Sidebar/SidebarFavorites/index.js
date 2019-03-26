import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { favoritesSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

import CardCompact from '~/components/Card/CardCompact';

import SidebarTitle from '../SidebarTitle';

const ListItems = styled.div``;

class SidebarList extends PureComponent {
  render() {
    const { data, setDetailRoute } = this.props;

    return (
      <Fragment>
        <SidebarTitle>Favoriten</SidebarTitle>
        <ListItems>
          {data.map(d => (
            <CardCompact onClick={() => setDetailRoute(d.id)} key={d.id} data={d} />
          ))}
        </ListItems>
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: favoritesSelector(state)
}), Actions)(SidebarList);
