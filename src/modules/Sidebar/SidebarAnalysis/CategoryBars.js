import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { getColorByCategory } from '~/state/DataUtils';

const maxX = 10;

const BarWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const BarOuter = styled.div`
  flex-grow: 1;
`;

const Bar = styled.div`
  height: 10px;
  background: ${props => props.color};
  width: ${props => `${props.width}%`};
`;

const Axis = styled.div`
  display: flex;
  color: #777;
  font-size: ${props => props.theme.fontSizes[0]};
  margin-left: 90px;
  border-top: 1px solid #ddd;
  padding-top: 5px;
`;

const AxisLabel = styled.div``;

const BarTitle = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
  min-width: 90px;
`;

const CategoryBarsWrapper = styled.div`
  padding: 15px 0 10px 0;
`;

const Title = styled.div`
  font-size: ${props => props.theme.fontSizes[1]};
  font-weight: 700;
  margin-bottom: 10px;
`;

class CategoryBars extends PureComponent {
  render() {
    const { data, title } = this.props;
    return (
      <CategoryBarsWrapper>
        <Title>{title}</Title>
        {data.map(d => (
          <BarWrapper key={`Bar__${d.category}`}>
            <BarTitle>{d.category}</BarTitle>
            <BarOuter>
              <Bar
                color={getColorByCategory(d.category)}
                width={(d.perPop / maxX) * 100}
              />
            </BarOuter>
          </BarWrapper>
        ))}
        <Axis>
          <AxisLabel>0</AxisLabel>
          <AxisLabel style={{ marginLeft: 'auto' }}>{maxX}</AxisLabel>
        </Axis>
      </CategoryBarsWrapper>
    );
  }
}

export default CategoryBars;
