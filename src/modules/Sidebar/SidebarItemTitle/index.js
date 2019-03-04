import React from 'react';
import styled from 'styled-components';

const SideBarItemTitleWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const SideBarItemTitle = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes[2]};
  font-weight: 700;
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  margin-left: auto;
  color: #777;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes[0]};

  &:hover {
    opacity: 0.75;
  }
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
