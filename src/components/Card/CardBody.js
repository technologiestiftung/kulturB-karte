import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

const CardBodyWrapper = styled.div`
  display: block;
  height: 400px;
`;

class CardBody extends PureComponent {
  render() {
    return (
      <CardBodyWrapper className={this.props.className}>
        <a href={this.props.detailData.website}>Website</a>
      </CardBodyWrapper>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
}))(CardBody);
