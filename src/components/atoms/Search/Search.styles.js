import styled from 'styled-components'

export const Input = styled.input`
  height: 50px;
  font-size: 25px;
  width: 100%;
  border: 2px solid #646363ff;
  border-radius: 15px;
  margin: 8px 0;
  outline: none;
  padding: 8px 8px 8px 50px;
  box-sizing: border-box;
  transition: 0.3s;
  cursor: text;

  &:focus {
    border-color: #9aaed6;
    box-shadow: 0 0 8px 0 #9aaed6;
  }

  :focus + .left-icon {
    svg {
      fill: #9aaed6;
    }
  }
`

export const StyledInput = styled.div`
  &.inputWithIcon {
    position: relative;
  }

  .left-icon {
    position: absolute;
    left: 13px;
    top: 54%;
    transform: translateY(-50%);

    svg {
      fill: #646363ff;
      transition: 0.3s;
    }
  }

  button.right-icon {
    background: none;
    border: none;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);

    svg {
      fill: #9aaed6;
      transition: 0.3s;
    }
  }
`
