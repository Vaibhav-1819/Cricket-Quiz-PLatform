import React from "react";
import "../styles/App.css";

const ProgressBar = ({ current, total }) => {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar;