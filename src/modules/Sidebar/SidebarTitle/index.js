import styled from 'styled-components';

export default styled.div`
  font-family: ${props => props.theme.fonts.sans};
  font-size: ${props => props.theme.fontSizes[4]};
  letter-spacing: 1px;
  font-weight: 900;
  margin-bottom: ${props => props.theme.margin[2]};
  line-height: 1;
  padding-right: 45px;
`;
