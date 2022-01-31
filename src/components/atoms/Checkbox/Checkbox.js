import React from 'react'
import { string, bool, func } from 'prop-types'
import { Indicator, Input, Label } from 'components/atoms/Checkbox/Checkbox.styles'

const Checkbox = ({ value, checked, onChange, label }) => (
  <Label>
    {label}
    <Input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={checked}
    />
    <Indicator />
  </Label>
)

Checkbox.propTypes = {
  value: string.isRequired,
  checked: bool.isRequired,
  onChange: func.isRequired,
  label: string.isRequired,
}

export default Checkbox
