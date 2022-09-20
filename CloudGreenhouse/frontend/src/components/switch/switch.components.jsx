import React from "react";
import "./switch.styles.scss";

const Switch = ({ isOn, handleToggle, id, onColor }) => {
  return (
    <>
      <input
        id={id}
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={id}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
