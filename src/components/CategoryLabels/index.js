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
  padding: 2px 5px;
  border-radius: 8px;
  color: ${props => props.color || '#ddd'};
  position: relative;
  padding-left: 12px;
  line-height: 1;

  &:before {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    background: ${props => props.color || '#ddd'};
    border-radius: 100%;
    left: 0;
    top: 3px;
  }
`;

class CategoryLabels extends PureComponent {
  render() {
    const { categories, colorizer } = this.props;

    return (
      <CategoryLabelWrapper>
        {categories.map(cat => (
          <CategoryLabel
            key={`CategoryLabel__${cat}`}
            color={colorizer(cat)}
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
