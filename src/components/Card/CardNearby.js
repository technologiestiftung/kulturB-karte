import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'unistore/react';
import PlusIcon from '@material-ui/icons/Add';

import Actions from '~/state/Actions';

import Button from '~/components/Button';
import CardHeader from './CardHeader';
import CardDivider from './CardDivider';

const CardNearbyWrapper = styled.div`
  display: block;
  background: #f8f8f8;
`;

const CardDistance = styled.div`
  font-size: 12px;
  color: #777;
  margin-top: 5px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding: ${props => props.theme.padding[1]};
  background: #eee;
`;

const NearbyCard = styled.div`
  border-top: 1px solid #ddd;
  padding: ${props => props.theme.padding[1]};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.lightgrey};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;

  svg {
    width: 14px;
    height: 14px;
    font-size: 12px;
  }
`;

class CardNearby extends PureComponent {
  state = {
    index: 0
  }

  onShowMore() {
    this.setState(prevState => ({
      index: prevState.index + 1
    }));
  }

  handleNearbyClick(props) {
    this.props.setDetailRoute(props.id);
  }

  render() {
    const { data } = this.props;
    const endIndex = 3 + (this.state.index * 3);
    const hasShowMore = endIndex < data.length;

    if (!data || !data.length) {
      return null;
    }

    return (
      <CardNearbyWrapper>
        <CardDivider style={{ marginBottom: 0 }} />
        <CardTitle>In der Nähe:</CardTitle>
        {data.slice(0, endIndex).map(d => (
          <NearbyCard onClick={() => this.handleNearbyClick(d)} key={`NearbyCard__${d.id}`}>
            <CardHeader data={d} />
            <CardDistance>
              {Math.floor(d.detailDistance * 1000)}
              <span> Meter entfernt</span>
            </CardDistance>
          </NearbyCard>
        ))}
        {hasShowMore && (
          <ButtonWrapper>
            <Button onClick={() => this.onShowMore()}>
              <PlusIcon /> Mehr anzeigen
            </Button>
          </ButtonWrapper>
        )}
      </CardNearbyWrapper>
    );
  }
}

export default connect(null, Actions)(CardNearby);
