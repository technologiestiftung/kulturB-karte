import React, { PureComponent } from 'react';
import { connect } from 'unistore/react';
import styled from 'styled-components';

const CardBodyWrapper = styled.div`
  font-size: ${props => props.theme.fontSizes[0]};
`;

const CardBodySection = styled.div`
  display: flex;
`;

const CardSectionLeft = styled.div`
  margin-right: 10px;
`;

const CardSectionRight = styled.div`
  margin-left: auto;
`;

function formatWebsite(str) {
  if (!str) {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/https?:\/\//, '')
    .replace(/www\./, '')
    .replace(/\/$/, '');
}


class CardBody extends PureComponent {
  render() {
    const { detailData } = this.props;

    return (
      <CardBodyWrapper className={this.props.className}>
        <CardBodySection>
          <CardSectionLeft>Website</CardSectionLeft>
          {detailData.website && (
            <CardSectionRight>
              <a href={detailData.website}>
                {formatWebsite(detailData.website)}
              </a>
            </CardSectionRight>
          )}
        </CardBodySection>
      </CardBodyWrapper>
    );
  }
}

export default connect(state => ({
  detailData: state.detailData,
}))(CardBody);
