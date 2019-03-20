import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

import WheelChairIcon from '@material-ui/icons/Accessible';
import BlindIcon from '@material-ui/icons/VisibilityOff';
import DeafIcon from '@material-ui/icons/Hearing';

import Actions from '~/state/Actions';

import SidebarItemTitle from '../SidebarItemTitle';

const AccessibilityFilterWrapper = styled.div`
  margin-bottom: ${props => props.theme.margin[2]};
`;

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.margin[0]};
  max-width: 125px;
`;

const FilterButton = styled.button`
  border: none;
  outline: none;
  background: ${props => (props.isActive ? props.theme.colors.secondary : props.theme.colors.lightgrey)};
  color: ${props => (props.isActive ? '#fff' : props.theme.colors.textgrey)};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

class AccessibilityFilter extends PureComponent {
  render() {
    const {
      a11yWheelChairFilter,
      a11yBlindFilter,
      a11yDeafFilter,
      toggleFilter
    } = this.props;

    return (
      <AccessibilityFilterWrapper>
        <SidebarItemTitle
          text="Barrierefreiheit"
        />
        <FilterButtonContainer>
          <FilterButton onClick={() => toggleFilter('a11yWheelChairFilter')} isActive={a11yWheelChairFilter}>
            <WheelChairIcon fontSize="inherit" />
          </FilterButton>

          <FilterButton onClick={() => toggleFilter('a11yBlindFilter')} isActive={a11yBlindFilter}>
            <BlindIcon fontSize="inherit" />
          </FilterButton>

          <FilterButton onClick={() => toggleFilter('a11yDeafFilter')} isActive={a11yDeafFilter}>
            <DeafIcon fontSize="inherit" />
          </FilterButton>
        </FilterButtonContainer>
      </AccessibilityFilterWrapper>
    );
  }
}

export default connect(state => ({
  a11yWheelChairFilter: state.filter.a11yWheelChairFilter,
  a11yBlindFilter: state.filter.a11yBlindFilter,
  a11yDeafFilter: state.filter.a11yDeafFilter
}), Actions)(AccessibilityFilter);
