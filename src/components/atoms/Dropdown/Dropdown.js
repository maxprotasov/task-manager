import React from 'react'
import { func, arrayOf, shape, string } from 'prop-types'
import { DropDownContainer, MultiSelect } from './Dropdown.styles'

const Dropdown = ({ options, selectOptions }) => (
  <DropDownContainer>
    <MultiSelect
      multi
      isMulti
      onChange={selectOptions}
      closeMenuOnSelect={false}
      options={options}
    />
  </DropDownContainer>
)

Dropdown.propTypes = {
  options: arrayOf(
    shape({
      value: string,
      label: string,
    }),
  ).isRequired,
  selectOptions: func.isRequired,
}

export default Dropdown
