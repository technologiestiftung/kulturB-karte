import React, { PureComponent } from 'react';
import styled from 'styled-components';

import CardHeader from './CardHeader';

const CardNearbyWrapper = styled.div`
  display: block;
`;

const Headline = styled.div`
  font-weight: bold;
`;

const CardDistance = styled.div``;
const NearbyCard = styled.div``;

class CardNearby extends PureComponent {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <CardNearbyWrapper>
        <Headline>In der Nähe</Headline>
        {data.map(d => (
          <NearbyCard>
            <CardDistance>
              {Math.floor(d.distance * 1000)}
              Meter entfernt
            </CardDistance>
            <CardHeader key={`NearbyCard__${d.id}`} data={d} />
          </NearbyCard>
        ))}
      </CardNearbyWrapper>
    );
  }
}

export default CardNearby;
