import React, { PureComponent } from 'react';
import styled from 'styled-components';

const CategoryLabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CategoryLabel = styled.div`
  display: block;
`;

class CategoryLabels extends PureComponent {
  render() {
    return (
      <CategoryLabelWrapper>
        {this.props.categories.map(cat => (
          <CategoryLabel key={`CategoryLabel__${cat}`}>{cat}</CategoryLabel>
        ))}
      </CategoryLabelWrapper>
    );
  }
}

export default CategoryLabels;
