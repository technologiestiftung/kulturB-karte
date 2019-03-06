import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { getColorByCategory } from '~/state/DataUtils';

const StackedBarsWrapper = styled.div`
  display: flex;
  height: 10px;
  background: #bbb;
`;

const Bar = styled.div`
  height: 100%;
  width: ${props => `${props.width}%`};
  background: ${props => props.color};
`;

class StackedBars extends PureComponent {
  render() {
    const { data, count } = this.props;

    return (
      <StackedBarsWrapper>
        {data.map(d => (
          <Bar
            key={`HorizontalBar__${d.category}`}
            color={getColorByCategory(d.category)}
            width={(d.items.length / count) * 100}
          />
        ))}
      </StackedBarsWrapper>
    );
  }
}

export default StackedBars;
