import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import { hasFilterSelector, initialFilterSelector } from '~/state/Selectors';
import Actions from '~/state/Actions';

import GhostButton from '~/components/GhostButton';

const ResetFilterButtonWrapper = styled.div`
  height: 15px;
`;

const ResetFilterButton = styled(GhostButton)`
  display: block;
  color: ${props => props.theme.colors.primary};
`;

class ResetFilter extends PureComponent {
  render() {
    const { hasFilter, initialFilter } = this.props;

    return (
      <ResetFilterButtonWrapper>
        {hasFilter && (
          <ResetFilterButton
            onClick={() => {
              this.props.setDetailData(false);
              this.props.setFilter(initialFilter);
            }}
          >
          × Alle Filter Zurücksetzen
          </ResetFilterButton>
        )}
      </ResetFilterButtonWrapper>
    );
  }
}

export default connect(state => ({
  hasFilter: hasFilterSelector(state),
  initialFilter: initialFilterSelector(state)
}), Actions)(ResetFilter);
