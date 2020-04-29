import React from "react";
import "./Loader.scss";

function Loader({ isLoading }) {
  return (
    <div className={`loader ${isLoading ? "loader--shown" : ""}`}>
      <div className="loader__inner" />
    </div>
  );
}

export default Loader;
