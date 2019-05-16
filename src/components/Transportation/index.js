import React, { PureComponent } from 'react';
import styled from 'styled-components';

const TransportationWrapper = styled.div`
   color: ${props => props.theme.colors.textgrey};
`;

const TransportationItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2em 0;
`;

const Label = styled.div`
  margin-right: 1em;
`;

const Data = styled.div``;

class Transportation extends PureComponent {
  render() {
    const { data } = this.props;
    console.log(this.props.data);
    return (
      <TransportationWrapper>
        {data.subway && <TransportationItem><Label>U-Bahn:</Label><Data>{data.subway}</Data></TransportationItem>}
        {data.bus && <TransportationItem><Label>Bus:</Label><Data>{data.bus}</Data></TransportationItem>}
        {data.tram && <TransportationItem><Label>Tram:</Label><Data>{data.tram}</Data></TransportationItem>}
        {data.railway && <TransportationItem><Label>S-Bahn:</Label><Data>{data.railway}</Data></TransportationItem>}
      </TransportationWrapper>
    );
  }
}

export default Transportation;
