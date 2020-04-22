import React, { forwardRef } from "react";
import "./Input.scss";

const Input = forwardRef(
  (
    {
      value,
      onChange,
      onFocus,
      name,
      type = "text",
      placeholder = "",
      className,
    },
    ref
  ) => (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      className={`input ${className ? className : ""}`}
      name={name}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  )
);

// const Input = forwardRef({
//   value,
//   onChange,
//   onFocus,
//   name,
//   type = "text",
//   placeholder = "",
//   className,
// }, ref) => {
//   return (
//     <input
//       ref={ref}
//       value={value}
//       onChange={onChange}
//       onFocus={onFocus}
//       className={`input ${className ? className : ""}`}
//       name={name}
//       type={type}
//       placeholder={placeholder}
//       autoComplete="off"
//       autoCorrect="off"
//       autoCapitalize="off"
//       spellCheck="false"
//     />
//   );
// }

export default Input;
