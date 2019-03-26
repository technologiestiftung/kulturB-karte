import React, { PureComponent } from 'react';
import styled from 'styled-components';
import idx from 'idx';

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
  border-radius: 50%;
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
  color: ${props => props.theme.colors.textgrey};
`;

class CardHeader extends PureComponent {
  render() {
    const { data, className } = this.props;
    const hasLogo = idx(data, _ => _.logo.url);

    return (
      <CardHeaderWrapper className={className}>
        <CardHeaderLeft>
          <CategoryLabels categories={data.tags} />
          <CardTitle>{data.name}</CardTitle>
          <CardAddress>{data.address}</CardAddress>
        </CardHeaderLeft>
        <CardHeaderRight>
          {hasLogo && <CardImage src={data.logo.url} />}
        </CardHeaderRight>
      </CardHeaderWrapper>
    );
  }
}

export default CardHeader;
