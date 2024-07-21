import React from "react";
import "./Progress.css";

interface ProgressProps {
  value: number;
  max: number;
  onComplete: () => void;
}

const Progress: React.FC<ProgressProps> = ({ value, max, onComplete }) => {
  const percentage = (value / max) * 100;

  React.useEffect(() => {
    if (percentage >= 100) {
      onComplete();
    }
  }, [percentage, onComplete]);

  return (
    <div className="progress">
      <span>LOADING</span>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default Progress;
