import React from "react";
import "./Button.css";

type ButtonColor = "red" | "blue" | "green";

interface ButtonProps {
  color?: ButtonColor;
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  // Add your component logic here

  return (
    <span className="button-container">
      <button
        className={`button ${props.color || "blue"} ${props.size || ""}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </span>
  );
};

export default Button;
