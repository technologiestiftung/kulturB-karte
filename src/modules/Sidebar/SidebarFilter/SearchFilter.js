import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Select from 'react-select';

import { dataAsArraySelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

const SearchFilterWrapper = styled.div`
  display: block;
  margin-bottom: ${props => props.theme.margin[2]};
  font-size: ${props => props.theme.fontSizes[1]};

  .rs__clear-indicator {
    cursor: pointer;
  }
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
        <Select
          ref={(ref) => { this.select = ref; }}
          options={this.props.options}
          getOptionValue={option => (option.name)}
          getOptionLabel={option => (option.name)}
          onChange={item => this.onChange(item)}
          placeholder="Nach einer Einrichtung suchen..."
          classNamePrefix="rs"
          isClearable
        />
      </SearchFilterWrapper>
    );
  }
}

export default connect(state => ({
  options: dataAsArraySelector(state),
  detailData: state.detailData
}), Actions)(SearchFilter);
