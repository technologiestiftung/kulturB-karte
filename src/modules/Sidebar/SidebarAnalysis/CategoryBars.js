import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { getColorByCategory } from '~/state/DataUtils';
import { formatNumber } from '~/utils';

const maxX = 10;

const BarWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`;

const BarOuter = styled.div`
  flex-grow: 1;
  position: relative;

  :hover {
    .bar__label {
      display: block;
    }
  }
`;

const Bar = styled.div`
  height: 8px;
  background: ${props => props.color};
  width: ${props => `${props.width}%`};
  opacity: ${props => (props.isComparison ? 0.4 : 1)};
  margin-top: ${props => (props.isComparison ? '2px' : 0)};
`;

const BarLabel = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
  position: absolute;
  top: ${props => (props.hasDistrictId ? '-40px' : '-24px')};
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  padding: 4px 4px;
  z-index: 100;
  width: 200px;
  border-radius: 3px;
  display: none;
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
    const {
      data, title, districtId, districtName
    } = this.props;

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
              {districtId && (
                <Bar
                  color={getColorByCategory(d.category)}
                  width={(d.perPopBerlin / maxX) * 100}
                  isComparison
                />
              )}
              <BarLabel className="bar__label" hasDistrictId={districtId}>
                {districtId && <div>{districtName}: <strong>{d.perPop === 0 ? 0 : formatNumber((d.perPop / maxX * 100), 1)}</strong></div>}
                <div>Berlin: <strong>{formatNumber((d.perPopBerlin / maxX) * 100, 1)}</strong></div>
              </BarLabel>
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
