import React, { useState } from "react";
import Bottle, { BottleItem } from "./Bottle";
import "./Game.css";

interface Props {
  // Define the props for your component here
}
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];
// Function to shuffle an array
const generateInitialBottles = (
  numberOfBottles: number,
  numberOfColours: number
) => {
  const bottles = [];
  for (let i = 0; i < numberOfBottles; i++) {
    let bottle = [];
    for (let j = 0; j < numberOfColours; j++) {
      bottle.push({
        color: colors[j],
        height: 25,
      });
      bottles.push(bottle);
    }
  }
  return bottles;
};

const Game: React.FC<Props> = () => {
  const [bottleItems, setBottleItems] = useState(() =>
    generateInitialBottles(6, 6)
  );

  const bottles = bottleItems.map((bottle, index) => (
    <Bottle key={index} fillItems={bottle} />
  ));

  return <div className="game-container">{bottles}</div>;
};

export default Game;
