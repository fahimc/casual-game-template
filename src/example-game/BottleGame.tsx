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
    let bottleColors = [];
    for (let j = 0; j < numberOfColours; j++) {
      bottleColors.push({
        color: colors[i],
        height: 100 / numberOfColours,
      });
    }
    bottles.push(bottleColors);
  }
  bottles.push([]);
  return bottles;
};

function moveColorToBottle(
  bottleItems: BottleItem[][],
  moveBottleIndex: number,
  moveToBottleIndex: number
) {
  const moveColor = bottleItems[moveBottleIndex].pop();
  if (moveColor) {
    bottleItems[moveToBottleIndex].push(moveColor);
  }
  return bottleItems;
}

function shuffle(bottleItems: BottleItem[][]) {
  const numberOfColors = bottleItems[0].length;
  console.log(numberOfColors);
  //fill the empty bottle with all the other bottles
  for (let i = 0; i < bottleItems.length - 1; i++) {
    bottleItems = moveColorToBottle(bottleItems, i, bottleItems.length - 1);
  }
  return bottleItems;
}

const Game: React.FC<Props> = () => {
  const [bottleItems, setBottleItems] = useState(generateInitialBottles(6, 6));

  const newBottleItems = shuffle(bottleItems);
  const bottles = newBottleItems.map((bottle, index) => (
    <Bottle key={index} fillItems={bottle} />
  ));

  return <div className="game-container">{bottles}</div>;
};

export default Game;
