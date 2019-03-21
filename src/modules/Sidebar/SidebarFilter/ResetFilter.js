import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import { hasFilterSelector, initialFilterSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

import GhostButton from '~/components/GhostButton';

const ResetFilterButton = styled(GhostButton)`
  display: block;
  margin: ${props => props.theme.margin[0]} 0;
  color: ${props => props.theme.colors.primary};
`;

class ResetFilter extends PureComponent {
  render() {
    const { hasFilter, initialFilter } = this.props;

    if (!hasFilter) {
      return null;
    }

    return (
      <ResetFilterButton onClick={() => this.props.setFilter(initialFilter)}>
      × Alle Filter Zurücksetzen
      </ResetFilterButton>
    );
  }
}

export default connect(state => ({
  hasFilter: hasFilterSelector(state),
  initialFilter: initialFilterSelector(state)
}), Actions)(ResetFilter);
