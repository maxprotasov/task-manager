import styled from 'styled-components'

export const Wrapper = styled.button`
  color: #314362;
  margin: 10px;
  border: 2px solid #465f90;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  font-size: ${props => (props.type === 'primary' ? '18px' : '14px')};
  padding: ${props => (props.type === 'primary' ? '8px' : '4px')};
`
