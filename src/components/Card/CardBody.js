import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

const CardBodyWrapper = styled.div`
  display: block;
`;

const CardBodySection = styled.div`
  display: flex;
`;

const CardSectionLeft = styled.div``;

const CardSectionRight = styled.div`
  margin-left: auto;
`;


class CardBody extends PureComponent {
  render() {
    return (
      <CardBodyWrapper className={this.props.className}>

        <CardBodySection>
          <CardSectionLeft>Website</CardSectionLeft>
          <CardSectionRight>
            <a href={this.props.detailData.website}>{this.props.detailData.website}</a>
          </CardSectionRight>
        </CardBodySection>
      </CardBodyWrapper>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
}))(CardBody);
