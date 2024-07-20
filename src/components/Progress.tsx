import React from "react";

interface ProgressProps {
  value: number;
  max: number;
}

const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="progress">
      <span>LOADING</span>
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default Progress;
