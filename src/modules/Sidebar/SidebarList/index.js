import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { filteredListDataSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

import CardCompact from '~/components/Card/CardCompact';

import SidebarTitle from '../SidebarTitle';
import Sorter from './Sorter';
import ResetFilter from '../SidebarFilter/ResetFilter';

const ListItems = styled.div``;

class SidebarList extends PureComponent {
  render() {
    const { data, setDetailRoute } = this.props;

    return (
      <Fragment>
        <SidebarTitle><strong>{data.length}</strong> Kulturorte gefunden.</SidebarTitle>
        <ResetFilter />
        <Sorter />
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
  data: filteredListDataSelector(state)
}), Actions)(SidebarList);
