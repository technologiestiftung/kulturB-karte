import styled from 'styled-components';

export default styled.button`
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes[0]};
  padding: 3px 0;

  &:hover {
    opacity: 0.75;
  }

  &:focus {
    outline: none;
  }
`;
