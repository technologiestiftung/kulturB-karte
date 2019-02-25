import React, { PureComponent } from 'react';
import styled from 'styled-components';

import CategoryLabels from './CategoryLabels';

const CardHeaderWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const CardHeaderLeft = styled.div`
  overflow: hidden;
`;

const CardHeaderRight = styled.div`
  margin-left: auto;
`;

const CardImage = styled.div`
  display: block;
  width: 70px;
  height: 70px;
  background-image: ${props => `url(${props.src})`};
  background-position: center;
  background-size: cover;
`;

const CardTitle = styled.div``;

const CardAddress = styled.div``;

class CardHeader extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <CardHeaderWrapper>
        <CardHeaderLeft>
          <CategoryLabels categories={data.category} />
          <CardTitle>{data.name}</CardTitle>
          <CardAddress>{data.address}</CardAddress>
        </CardHeaderLeft>
        <CardHeaderRight>
          <CardImage src="https://via.placeholder.com/70" />
        </CardHeaderRight>
      </CardHeaderWrapper>
    );
  }
}

export default CardHeader;
