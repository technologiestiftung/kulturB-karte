import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { getColorByCategory } from '~/state/DataUtils';

const BarVisWrapper = styled.div`
  margin-top: 10px;
`;

const HorizontalBars = styled.div`
  display: flex;
  height: 10px;
  background: #bbb;
`;

const HorizontalBar = styled.div`
  height: 100%;
  width: ${props => `${props.width}%`};
  background: ${props => props.color};
`;

const Bars = styled.div``;

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

const BarTitle = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
  min-width: 90px;
`;

const VisWrapper = styled.div`
  padding: 15px 0 10px 0;
`;

const VisTitle = styled.div`
  font-size: ${props => props.theme.fontSizes[1]};
  font-weight: 700;
  margin-bottom: 10px;
`;

function groupByCategory(res, feat) {
  return res.map(d => ({
    ...d,
    items: d.category === feat.properties.mainCategory ? d.items.concat(feat.properties) : d.items
  }));
}

function sortByItemsLength(a, b) {
  if (a.items.length < b.items.length) {
    return 1;
  }

  if (a.items.length > b.items.length) {
    return -1;
  }

  return 0;
}

class BarVis extends PureComponent {
  render() {
    const { data, categories, additionalData } = this.props;
    const bars = data
      .reduce(groupByCategory, categories)
      .sort(sortByItemsLength)
      .map(d => ({
        ...d,
        perPop: (d.items.length / additionalData.population) * 100000
      }));

    return (
      <BarVisWrapper>
        <HorizontalBars>
          {bars.map(d => (
            <HorizontalBar
              key={`HorizontalBar__${d.category}`}
              color={getColorByCategory(d.category)}
              width={(d.items.length / data.length) * 100}
            />
          ))}
        </HorizontalBars>
        <VisWrapper>
          <VisTitle>Anzahl der Kulturorte pro 100.000 Einwohner</VisTitle>

          <Bars>
            {bars.map(d => (
              <BarWrapper key={`Bar__${d.category}`}>
                <BarTitle>{d.category}</BarTitle>
                <BarOuter>
                  <Bar
                    color={getColorByCategory(d.category)}
                    width={(d.perPop / 10) * 100}
                  />
                </BarOuter>
              </BarWrapper>
            ))}
          </Bars>
        </VisWrapper>
      </BarVisWrapper>
    );
  }
}

export default BarVis;
