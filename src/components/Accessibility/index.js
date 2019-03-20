import React, { PureComponent } from 'react';
import styled from 'styled-components';

import WheelChairIcon from '@material-ui/icons/Accessible';
import BlindIcon from '@material-ui/icons/VisibilityOff';
import DeafIcon from '@material-ui/icons/Hearing';

const AccessibilityWrapper = styled.div`
  display: block;
`;

const AccessibilityItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.textgrey};
`;

const IconContainer = styled.div`
  color: ${props => (props.highlight ? props.theme.colors.secondary : props.theme.colors.textgrey)};
  margin-right: 0.3em;
  font-size: 20px;
`;

function getAccessibilityLabel(property) {
  switch (property) {
    case 'no':
      return 'nicht barrierefrei';
    case 'yes':
      return 'barrierefrei';
    case 'limited':
      return 'teilweise barrierefrei';
    default:
      return 'keine Angaben';
  }
}

class Accessibility extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <AccessibilityWrapper>
        <AccessibilityItem>
          <IconContainer highlight={data.accessibility_wheelchair}>
            <WheelChairIcon fontSize="inherit" />
          </IconContainer>
          {getAccessibilityLabel(data.accessibility_wheelchair)}
        </AccessibilityItem>

        <AccessibilityItem>
          <IconContainer highlight={data.accessibility_blind}>
            <BlindIcon fontSize="inherit" />
          </IconContainer>
          {getAccessibilityLabel(data.accessibility_blind)}
        </AccessibilityItem>

        <AccessibilityItem>
          <IconContainer highlight={data.accessibility_deaf}>
            <DeafIcon fontSize="inherit" />
          </IconContainer>
          {getAccessibilityLabel(data.accessibility_deaf)}
        </AccessibilityItem>
      </AccessibilityWrapper>
    );
  }
}

export default Accessibility;
