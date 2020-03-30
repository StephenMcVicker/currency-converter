import React from "react";
import styled from "styled-components";

const StyledSwitch = styled.div`
  .react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  .react-switch-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: ${props => props.width || "60px"};
    height: calc(${props => props.width || "60px"} / 2);
    background: grey;
    border-radius: ${props => props.width || "60px"};
    position: relative;
    transition: background-color 0.2s;
  }

  .react-switch-label .react-switch-button {
    content: "";
    position: absolute;
    top: 10%;
    left: 2px;
    width: 40%;
    height: 80%;
    border-radius: 100%;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  }

  .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  .react-switch-label:active .react-switch-button {
    width: calc(${props => props.width || "60px"} / 2);
  }
`;

const ToggleSwitch = ({ isOn, handleToggle, onColor, width }) => {
  return (
    <StyledSwitch width={width}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </StyledSwitch>
  );
};

export default ToggleSwitch;
