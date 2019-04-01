import styled from 'styled-components';

export default styled.button`
  width: ${props => props.size || 36}px;
  height: ${props => props.size || 36}px;
  background-color: ${props => (props.isActive ? props.theme.colors.primary : '#000')};
  color: white;
  transition: background-color .3s;
  will-change: background-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  border: none;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;
