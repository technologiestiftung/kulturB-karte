import React, { PureComponent } from 'react';
import styled from 'styled-components';

const CardBodyWrapper = styled.div`
  display: block;
  height: 400px;
`;

class CardBody extends PureComponent {
  render() {
    return (
      <CardBodyWrapper className={this.props.className}>
        Hier werden die Detailinformationen angezeigt...
      </CardBodyWrapper>
    );
  }
}

export default CardBody;
