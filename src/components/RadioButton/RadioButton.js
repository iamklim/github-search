import React from "react";
import PropTypes from "prop-types";
import "./RadioButton.scss";

function RadioButton({ text, value, checked, onChange }) {
  return (
    <label className="radio-btn">
      {text}
      <input
        type="radio"
        name="radio"
        checked={checked}
        value={value}
        onChange={onChange}
      />
      <span className="radio-btn__checkmark" />
    </label>
  );
}

RadioButton.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioButton;
