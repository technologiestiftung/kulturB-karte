import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CategoryLabel = styled.div`
  display: block;
  font-size: ${props => props.theme.fontSizes[0]};
  margin-right: 5px;
  padding: 2px 5px 2px 12px;
  border-radius: 8px;
  color: ${props => props.color || '#ddd'};
  position: relative;
  line-height: 1;
  background: ${props => (props.hasBorder ? 'white' : 'none')};

  &:before {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    background: ${props => props.color || '#ddd'};
    border-radius: 100%;
    left: ${props => (props.hasBorder ? '3px' : 0)};
    top: ${props => (props.hasBorder ? '3px' : '2px')};
  }
`;

class CategoryLabels extends PureComponent {
  render() {
    const {
      categories, colorizer, className, hasBorder
    } = this.props;

    return (
      <CategoryLabelWrapper className={className}>
        {categories.map(cat => (
          <CategoryLabel
            key={`CategoryLabel__${cat}`}
            color={colorizer(cat)}
            hasBorder={hasBorder}
          >
            {cat}
          </CategoryLabel>
        ))}
      </CategoryLabelWrapper>
    );
  }
}

export default connect(state => ({
  colorizer: state.colorizer
}))(CategoryLabels);
