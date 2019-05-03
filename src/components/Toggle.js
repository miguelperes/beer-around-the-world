import React from "react";
import PropTypes from "prop-types";

import ReactToggle from "react-toggle";
import "react-toggle/style.css";

const Toggle = ({ leftStateName, rightStateName, defaultValue, onToggle }) => {
  return (
    <React.Fragment>
      <span className="mr2">{leftStateName}</span>
      <ReactToggle
        defaultChecked={defaultValue}
        icons={false}
        onChange={onToggle}
      />
      <span className="ml2">{rightStateName}</span>
    </React.Fragment>
  );
};

Toggle.propTypes = {
  leftStateName: PropTypes.string,
  rightStateName: PropTypes.string,
  defaultValue: PropTypes.bool,
  onToggle: PropTypes.func
}

export default Toggle;
