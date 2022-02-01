import React from 'react'
import { bool, oneOf } from 'prop-types'
import { Wrapper } from './Button.styles'

const Button = props => <Wrapper {...props} />

Button.propTypes = {
  type: oneOf(['primary', 'secondary']),
  active: bool,
}

Button.defaultProps = {
  type: 'primary',
  active: false,
}

export default Button
