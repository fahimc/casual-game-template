import React from "react";
import "./Layer.css";

interface LayerProps {
  children?: React.ReactNode;
  disableEvents?: boolean;
}

const Layer: React.FC<LayerProps> = (props: LayerProps) => {
  // Add your component logic here

  return (
    <div
      className={`layer-container ${
        props.disableEvents ? "disabled-events" : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Layer;
