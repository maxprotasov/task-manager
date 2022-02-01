import styled from 'styled-components'

export const Wrapper = styled.button`
  color: #314362;
  margin-left: 10px;
  border: ${props => (props.type === 'primary' ? '2px solid #465f90' : '1px solid #465f90')};
  border-radius: ${props => (props.type === 'primary' ? '15px' : '7px')};
  display: inline-block;
  cursor: pointer;
  font-size: ${props => (props.type === 'primary' ? '18px' : '14px')};
  padding: ${props => (props.type === 'primary' ? '13px' : '4px')};
  background-color: ${props => (props.active ? '#9aaed6' : '#fff')};
`
