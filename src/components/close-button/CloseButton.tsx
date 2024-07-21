import React from "react";
import "./CloseButton.css";

interface ButtonProps {
  onClick?: () => void;
}

const CloseButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  // Add your component logic here

  return (
    <span className="close-button-container">
      <button className={`close-button`} onClick={props.onClick}>
        <span>x</span>
      </button>
    </span>
  );
};

export default CloseButton;
