import styled from 'styled-components'

export const Input = styled.input`
  height: 50px;
  font-size: 25px;
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 4px;
  margin: 8px 0;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
  padding-left: 50px;
  cursor: pointer;

  &:focus {
    border-color: #465f90;
    box-shadow: 0 0 8px 0 #465f90;
  }

  :focus + .left-icon {
    svg {
      fill: #465f90;
    }
  }
`;

export const StyledInput = styled.div`
  &.inputWithIcon {
    position: relative;
  }

  .left-icon {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    svg {
      fill: black;
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
      fill: #465f90;
      transition: 0.3s;
    }
  }
`;
