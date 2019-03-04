import styled from 'styled-components';

export default styled.select`
  width: 100%;
  background: white;
  font-family: ${props => props.theme.fonts.sans};
  height: 35px;
  border: 1px solid #ddd;
  font-size: ${props => props.theme.fontSizes[1]};
`;
