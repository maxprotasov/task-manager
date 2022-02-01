import styled from 'styled-components'

export const Wrapper = styled.title`
  display: block;
  padding: 8px;
  line-height: 40px;
  font-size: ${props => (props.subTitle ? '32px' : '42px')};
`
