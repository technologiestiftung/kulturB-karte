import styled from 'styled-components';

export default styled.p`
  font-family: ${props => props.theme.fonts.sans};
  font-size: ${props => props.theme.fontSizes[1]};
  line-height: 1.4;
`;
