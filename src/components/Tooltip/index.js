import React, { PureComponent } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  display: block;
`;

class Tooltip extends PureComponent {
  render() {
    return (
      <TooltipWrapper>
        Tooltip
      </TooltipWrapper>
    );
  }
}

export default Tooltip;
