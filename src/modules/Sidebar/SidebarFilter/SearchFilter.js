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

const SearchFilterLabel = styled.div`
  margin-bottom: 5px;
`;

class SearchFilter extends PureComponent {
  componentDidUpdate(prevProps) {
    if (!this.props.detailData && prevProps.detailData) {
      this.select.select.clearValue();
    }
  }

  handleChange(evt) {
    this.props.loadEntryData(evt);
  }

  render() {
    return (
      <SearchFilterWrapper>
        <SearchFilterLabel>
          Kultureinrichtung suchen
        </SearchFilterLabel>
        <Select
          ref={(ref) => { this.select = ref; }}
          options={this.props.options}
          getOptionValue={option => (option.name)}
          getOptionLabel={option => (option.name)}
          onChange={evt => this.handleChange(evt)}
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
