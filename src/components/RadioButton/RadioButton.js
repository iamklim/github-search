import React from "react";
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

export default RadioButton;
