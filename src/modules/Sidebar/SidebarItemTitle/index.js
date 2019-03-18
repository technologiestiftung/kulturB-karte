import React from 'react';
import styled from 'styled-components';

import GhostButton from '~/components/GhostButton';

const SideBarItemTitleWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const SideBarItemTitle = styled.div`
  font-family: ${props => props.theme.fonts.sans};
  font-size: ${props => props.theme.fontSizes[2]};
  font-weight: 700;
`;

const ResetButton = styled(GhostButton)`
  margin-left: auto;
`;

export default props => (
  <SideBarItemTitleWrapper>
    <SideBarItemTitle>{props.text}</SideBarItemTitle>
    {props.showReset && (
      <ResetButton onClick={props.onReset}>
        × Zurücksetzen
      </ResetButton>
    )}
  </SideBarItemTitleWrapper>
);
