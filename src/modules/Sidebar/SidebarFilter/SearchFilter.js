import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Select from 'react-select';

import { dataAsArraySelector } from '~/state/Selectors';
import Actions from '~/state/Actions';
import SidebarItemTitle from '~/modules/Sidebar/SidebarItemTitle';

const SearchFilterWrapper = styled.div`
  display: block;
  margin-bottom: ${props => props.theme.margin[2]};
  font-size: ${props => props.theme.fontSizes[1]};
`;

class SearchFilter extends PureComponent {
  componentDidUpdate(prevProps) {
    if (!this.props.detailData && prevProps.detailData) {
      this.select.select.clearValue();
    }
  }

  onChange(item) {
    this.props.setDetailRoute(item ? item.id : false);
  }

  render() {
    return (
      <SearchFilterWrapper>
        <SidebarItemTitle
          text="Namen suchen"
        />
        <Select
          ref={(ref) => { this.select = ref; }}
          options={this.props.options}
          getOptionValue={option => (option.name)}
          getOptionLabel={option => (option.name)}
          onChange={item => this.onChange(item)}
          placeholder="Namen eingeben ..."
          classNamePrefix="rs"
        />
      </SearchFilterWrapper>
    );
  }
}

export default connect(state => ({
  options: dataAsArraySelector(state),
  detailData: state.detailData
}), Actions)(SearchFilter);
