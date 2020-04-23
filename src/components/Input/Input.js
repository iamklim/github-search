import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

const Input = forwardRef(
  (
    {
      value,
      onChange,
      className,
      name,
      onFocus,
      onKeyDown,
      onKeyUp,
      placeholder = "",
      type = "text",
    },
    ref
  ) => (
    <input
      ref={ref}
      value={value}
      className={`input ${className ? className : ""}`}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
      type={type}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  )
);

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
