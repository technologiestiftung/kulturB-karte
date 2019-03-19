import styled from 'styled-components';

export default styled.select`
  width: 100%;
  background: white;
  font-family: ${props => props.theme.fonts.sans};
  height: 35px;
  border: 3px solid ${props => props.theme.colors.midgrey};
  font-size: ${props => props.theme.fontSizes[2]};
  color: black;
  font-weight: 700;
  border-radius: 0;
  outline: none;
`;
