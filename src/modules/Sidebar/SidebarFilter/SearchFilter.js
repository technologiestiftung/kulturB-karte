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

  onChange(evt) {
    this.props.loadEntryData(evt);
  }

  render() {
    return (
      <SearchFilterWrapper>
        <SidebarItemTitle
          text="Kultorort suchen"
        />
        <Select
          ref={(ref) => { this.select = ref; }}
          options={this.props.options}
          getOptionValue={option => (option.name)}
          getOptionLabel={option => (option.name)}
          onChange={evt => this.onChange(evt)}
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
