import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

const StackedBarsWrapper = styled.div`
  display: flex;
  height: 10px;
  background: #bbb;
`;

const Bar = styled.div`
  height: 100%;
  width: ${props => `${props.width}%`};
  background: ${props => props.color};
  position: relative;

  &:hover {
    .bar__label {
      display: block;
    }
  }
`;

const BarLabel = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
  position: absolute;
  top: -24px;
  left: ${props => (props.isRight ? 'auto' : 0)};
  right: ${props => (props.isRight ? 0 : 'auto')};
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  display: none;
  padding: 4px 4px;
  z-index: 100;
  width: 110px;
  text-align: center;
  border-radius: 2px;
`;

class StackedBars extends PureComponent {
  render() {
    const { data, count, colorizer } = this.props;

    return (
      <StackedBarsWrapper>
        {data.map((d, i) => (
          <Bar
            key={`HorizontalBar__${d.category}`}
            color={colorizer(d.category)}
            width={(d.items.length / count) * 100}
          >
            <BarLabel className="bar__label" isRight={i > (data.length / 2)}>
              {d.category}: <strong>{d.items.length}</strong>
            </BarLabel>
          </Bar>
        ))}
      </StackedBarsWrapper>
    );
  }
}

export default connect(state => ({
  colorizer: state.colorizer
}))(StackedBars);
