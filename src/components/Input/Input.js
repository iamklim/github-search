import React, { forwardRef } from "react";
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

export default Input;
