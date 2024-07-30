import React, { useState } from "react";
import "./Game.css";
import Character from "../components/character/Character";
import TileWorld from "../components/tile-world/TileWord";

interface Props {
  // Define the props for your component here
}

const Game: React.FC<Props> = () => {
  return (
    <div className="game-container">
      <TileWorld />
      <Character />
    </div>
  );
};

export default Game;
