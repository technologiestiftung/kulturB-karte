import styled from 'styled-components';

export default styled.div`
  font-family: ${props => props.theme.fonts.mono};
  letter-spacing: -1px;
  font-size: ${props => props.theme.fontSizes[3]};
  font-weight: 700;
  margin-bottom: ${props => props.theme.margin[2]};
  line-height: 1;
`;