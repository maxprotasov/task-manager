import styled from 'styled-components'
import ReactSelect from 'react-select'

export const DropDownContainer = styled.div`
  width: 220px;
  margin: 0;
`

export const MultiSelect = styled(ReactSelect)`
  &.Select--multi {
    .Select-value {
      display: inline-flex;
      align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }
`
