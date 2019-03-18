import React, { PureComponent } from 'react';
import styled from 'styled-components';

import CardWrapper from './CardWrapper';
import CardHeader from './CardHeader';

const StyledCardWrapper = styled(CardWrapper)`
  margin-bottom: ${props => props.theme.margin[0]};
  padding: ${props => props.theme.padding[0]};
  cursor: pointer;
  border: 3px solid ${props => props.theme.colors.lightgrey};
  border-radius: 0;
  will-change: border-color;
  transition: border-color .2s;

  &:hover {
    border-color: #000;
  }
`;

class CardCompact extends PureComponent {
  render() {
    return (
      <StyledCardWrapper onClick={this.props.onClick}>
        <CardHeader data={this.props.data} />
      </StyledCardWrapper>
    );
  }
}

export default CardCompact;
