import React, { PureComponent, Fragment } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import { filteredListDataSelector } from '~/state/Selectors';

import CardCompact from '~/components/Card/CardCompact';

import SidebarTitle from '../SidebarTitle';
import Sorter from './Sorter';

const ListItems = styled.div``;


class SidebarList extends PureComponent {
  render() {
    const { data } = this.props;
    console.log(data);

    return (
      <Fragment>
        <SidebarTitle>Liste</SidebarTitle>
        <Sorter />
        <ListItems>
          {data.map(d => <CardCompact data={d} />)}
        </ListItems>
      </Fragment>
    );
  }
}

export default connect(state => ({
  data: filteredListDataSelector(state)
}))(SidebarList);
