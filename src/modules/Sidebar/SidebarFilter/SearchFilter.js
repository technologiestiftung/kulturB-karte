import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import Select from 'react-select';

import { dataAsArraySelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

const SearchFilterWrapper = styled.div`
  display: block;
  margin-bottom: ${props => props.theme.margin[2]};
`;

class SearchFilter extends PureComponent {
  handleChange(evt) {
    this.props.setDetailData(evt);
  }

  render() {
    return (
      <SearchFilterWrapper>
        <Select
          options={this.props.options}
          getOptionValue={option => (option.name)}
          getOptionLabel={option => (option.name)}
          onChange={evt => this.handleChange(evt)}
        />
      </SearchFilterWrapper>
    );
  }
}

export default connect(state => ({
  options: dataAsArraySelector(state),
}), Actions)(SearchFilter);
