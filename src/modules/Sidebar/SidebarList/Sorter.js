import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

import Actions from '~/state/Actions';
import Select from '~/components/Select';

import SidebarItemTitle from '../SidebarItemTitle';

const StyledSelect = styled(Select)`
  margin-bottom: ${props => props.theme.margin[0]};
`;

class Sorter extends PureComponent {
  handleChange = (evt) => {
    this.props.setListSorting(evt.target.value);
  }

  render() {
    return (
      <div>
        <SidebarItemTitle text="Liste sortieren" />
        <StyledSelect onChange={this.handleChange} value={this.props.listSorting}>
          <option value="name">Name</option>
          <option value="mainCategory">Kategorie</option>
          <option value="isFav">Favoriten</option>
          {this.props.locationFilterCoords && <option value="distance">Enfernung</option>}
        </StyledSelect>
      </div>
    );
  }
}

export default connect(state => ({
  listSorting: state.listSorting,
  locationFilterCoords: state.filter.locationFilterCoords
}), Actions)(Sorter);
