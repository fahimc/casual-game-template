import React from "react";
import "./Hud.css";
import HudItem from "../hud-item/HudItem";

interface HudProps {
  children?: React.ReactNode;
}

const Hud: React.FC<HudProps> = (props: HudProps) => {
  // Add your component logic here

  return (
    <div className="hud-container">
      <div className="left-container">
        <HudItem>
          <span>HEALTH: 100</span>
        </HudItem>
      </div>
      <div className="right-container">
        <HudItem position="right">
          <span>HEALTH: 100</span>
        </HudItem>
      </div>
    </div>
  );
};

export default Hud;
