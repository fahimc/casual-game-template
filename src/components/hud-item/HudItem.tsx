import React from "react";
import "./HudItem.css";

interface HudItemProps {
  children?: React.ReactNode;
  position?: "left" | "right";
}

const HudItem: React.FC<HudItemProps> = (props: HudItemProps) => {
  // Add your component logic here

  return (
    <div className={`hud-item-container ${props.position || "left"}`}>
      {props.children}
    </div>
  );
};

export default HudItem;
