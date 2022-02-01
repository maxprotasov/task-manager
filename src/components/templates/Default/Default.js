import React from 'react'
import PropTypes from 'prop-types'
import { DefaultTemplate } from 'components/templates/Default/Default.styles'

const Default = ({ children }) => <DefaultTemplate>{children}</DefaultTemplate>

Default.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Default
