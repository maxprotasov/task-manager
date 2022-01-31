import React from 'react'
import { oneOf } from 'prop-types'
import { Wrapper } from './Button.styles'

const Button = props => <Wrapper {...props} />

Button.propTypes = {
  type: oneOf(['primary', 'secondary']),
}

Button.defaultProps = {
  type: 'primary',
}

export default Button
