import React, { PureComponent } from 'react';
import styled from 'styled-components';

import CardWrapper from './CardWrapper';
import CardHeader from './CardHeader';

const StyledCardWrapper = styled(CardWrapper)`
  margin-bottom: ${props => props.theme.margin[0]};
  padding: ${props => props.theme.padding[0]};
  padding-bottom: ${props => props.theme.margin[0]};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.theme.colors.lightgrey};
  border-radius: 0;
  will-change: border-color, transform;
  transition: border-color .2s, transform .2s;

  &:hover {
    border-color: ${props => props.theme.colors.midgrey};
    transform: translateX(5px);
  }
`;

class CardCompact extends PureComponent {
  render() {
    return (
      <StyledCardWrapper
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <CardHeader
          data={this.props.data}
          isListMode
        />
      </StyledCardWrapper>
    );
  }
}

export default CardCompact;
