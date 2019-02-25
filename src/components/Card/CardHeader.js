import React, { PureComponent } from 'react';
import styled from 'styled-components';

import CategoryLabels from '~/components/CategoryLabels';

const CardHeaderWrapper = styled.div`
  display: flex;
`;

const CardHeaderLeft = styled.div`
  overflow: hidden;
  margin-right: 10px;
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

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
`;

const CardAddress = styled.div`
  font-size: 12px;
  color: #777;
`;

class CardHeader extends PureComponent {
  render() {
    const { data, className } = this.props;

    return (
      <CardHeaderWrapper className={className}>
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
