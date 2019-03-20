import styled from 'styled-components';

export default styled.a`
  color: ${props => props.theme.colors.textgrey};
  font-weight: 700;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;
