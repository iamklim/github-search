import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

function Button({ className, onClick, icon }) {
  return (
    <button className={`btn ${className ? className : ""}`} onClick={onClick}>
      {icon}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  toggleFlow: PropTypes.func,
  icon: PropTypes.node,
};

export default Button;
