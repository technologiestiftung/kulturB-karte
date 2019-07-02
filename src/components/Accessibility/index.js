import React, { PureComponent } from 'react';
import styled from 'styled-components';
import idx from 'idx';

import WheelChairIcon from '@material-ui/icons/Accessible';
import BlindIcon from '@material-ui/icons/VisibilityOff';
import DeafIcon from '@material-ui/icons/Hearing';

const AccessibilityWrapper = styled.div`
  display: block;
`;

const AccessibilityItem = styled.div`
  color: ${props => props.theme.colors.textgrey};
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  margin: 0 0 10px 0;
  text-align: left;
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
    const wheelchair = idx(data, _ => _.accessibility.wheelchair.accessible);
    const blind = idx(data, _ => _.accessibility.blind);
    const deaf = idx(data, _ => _.accessibility.deaf);

    const wheelchairDescription = idx(data, _ => _.accessibility.wheelchair.accessible.description);
    const blindDescription = idx(data, _ => _.accessibility.blind.description);
    const deafDescription = idx(data, _ => _.accessibility.deaf.description);

    return (
      <AccessibilityWrapper>
        <AccessibilityItem>
          <LabelWrapper>
            <IconContainer highlight={wheelchair} role="img" title="Zugänglich für Menschen im Rollstuhl und Gehbehinderte">
              <WheelChairIcon fontSize="inherit" />
            </IconContainer>
            {getAccessibilityLabel(wheelchair)}
          </LabelWrapper>
          {wheelchairDescription && <Description>{wheelchairDescription}</Description>}
        </AccessibilityItem>

        <AccessibilityItem>
          <LabelWrapper>
            <IconContainer highlight={blind} role="img" title="Zugänglich für Blinde und Sehbehinderte">
              <BlindIcon fontSize="inherit" />
            </IconContainer>
            {getAccessibilityLabel(blind)}
          </LabelWrapper>
          {blindDescription && <Description>{blindDescription}</Description>}
        </AccessibilityItem>

        <AccessibilityItem>
          <LabelWrapper>
            <IconContainer highlight={deaf} role="img" title="Zugänglich für Gehörlose und Hörgeschädigte">
              <DeafIcon fontSize="inherit" />
            </IconContainer>
            {getAccessibilityLabel(deaf)}
          </LabelWrapper>
          {deafDescription && <Description>{deafDescription}</Description>}
        </AccessibilityItem>
      </AccessibilityWrapper>
    );
  }
}

export default Accessibility;
