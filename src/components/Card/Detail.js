import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Clear from '@material-ui/icons/Clear';

import RoundButton from '~/components/RoundButton';

import CardActions from './CardActions';
import CardWrapper from './CardWrapper';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardDivider from './CardDivider';
import CardNearby from './CardNearby';

const DetailCardWrapper = styled(CardWrapper)`
  position: absolute;
  z-index: 9000;
  top: 80px;
  right: 5%;
  left: 5%;
  margin: auto;
  max-width: 500px;
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 2px;

  @media screen and (min-width: 768px) {
    right: 20px;
    left: auto;
    width: 325px;
  }

  @media screen and (min-width: 1024px) {
    top: 120px;
  }
`;

const StyledCardHeader = styled(CardHeader)`
  padding: ${props => props.theme.padding[1]};
`;

const StyledCardBody = styled(CardBody)`
  padding: ${props => props.theme.padding[1]};
`;

const CloseButton = styled(RoundButton)`
  position: absolute;
  top: -15px;
  right: -12px;
  z-index: 9999;
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 100%;
`;

class DetailCard extends PureComponent {
  state = {
    maxHeight: 'auto'
  }

  componentDidMount() {
    const maxHeight = window.innerWidth <= 768
    ? window.innerHeight - 100
    : Math.max(250, window.innerHeight - 200);

    this.setState({ maxHeight });
  }

  onClose(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.props.onClose(evt);
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <DetailCardWrapper>
        <CloseButton onClick={evt => this.onClose(evt)} aria-label="Detailansicht schließen">
          <Clear />
        </CloseButton>
        <ScrollWrapper style={{ maxHeight: this.state.maxHeight }}>
          <StyledCardHeader data={data} />
          <CardActions data={data} />
          <CardDivider />
          <StyledCardBody data={data} />
          <CardNearby data={data.nearby} />
        </ScrollWrapper>
      </DetailCardWrapper>
    );
  }
}

export default DetailCard;
