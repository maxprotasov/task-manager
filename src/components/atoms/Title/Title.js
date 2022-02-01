import React from 'react'
import { bool } from 'prop-types'
import { Wrapper } from './Title.styles'

const Title = props => <Wrapper {...props} />

Title.propTypes = {
  subTitle: bool,
}

Title.defaultProps = {
  subTitle: false,
}

export default Title
