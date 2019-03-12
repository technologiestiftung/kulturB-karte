import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import Actions from '~/state/Actions';
import Checkbox from '~/components/Checkbox';

import ControlContainer from './ControlContainer';

const StyledContainer = styled(ControlContainer)`
  background: white;
  padding: ${props => `${props.theme.padding[0]} ${props.theme.padding[1]}`};
  border-radius: ${props => props.theme.borderRadius};
`;

class BoundingBoxToggle extends PureComponent {
  handleCheckbox() {
    this.props.toggleMapBoundsFilter();
  }

  render() {
    return (
      <StyledContainer position="top-left">
        <Checkbox
          checked={this.props.mapBoundsFilterActive}
          onChange={() => this.handleCheckbox()}
          label="Liste filtern, während die Karte bewegt wird"
        />
      </StyledContainer>
    );
  }
}

export default connect(state => ({
  mapBoundsFilterActive: state.mapBoundsFilterActive
}), Actions)(BoundingBoxToggle);
