import React from 'react'
import { string } from 'prop-types'
import { ChipElement } from './Chip.styles'

const Chip = ({ value }) => <ChipElement>{value}</ChipElement>

Chip.propTypes = {
  value: string.isRequired,
}

export default Chip
