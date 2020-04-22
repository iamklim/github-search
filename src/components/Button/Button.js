import React from "react";
import "./Button.scss";

function Button({ className, onClick, icon }) {
  return (
    <button className={`btn ${className ? className : ""}`} onClick={onClick}>
      {icon}
    </button>
  );
}

export default Button;
