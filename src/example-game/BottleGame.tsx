import React, { useState, useEffect, useCallback } from "react";
import Bottle, { BottleItem } from "./Bottle";
import "./Game.css";

interface Props {
  // Define the props for your component here
}

const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];

// Function to shuffle an array
const shuffleArray = (arr: any[]): any[] => {
  return arr.sort(() => Math.random() - 0.5);
};

// Generate initial bottles
const generateInitialBottles = (
  numberOfBottles: number,
  numberOfColors: number
): BottleItem[][] => {
  const bottles: BottleItem[][] = [];
  const colorPool: BottleItem[] = [];

  for (let i = 0; i < numberOfColors; i++) {
    for (let j = 0; j < numberOfBottles / numberOfColors; j++) {
      colorPool.push({ color: colors[i], height: 100 / numberOfColors });
    }
  }

  shuffleArray(colorPool);

  for (let i = 0; i < numberOfBottles - 2; i++) {
    const bottleColors: BottleItem[] = colorPool.splice(0, numberOfColors);
    bottles.push(bottleColors);
  }

  // Add two empty bottles
  bottles.push([]);
  bottles.push([]);

  return bottles;
};

const checkIfWon = (
  bottleItems: BottleItem[][],
  numberOfColors: number
): boolean => {
  let won = true;
  let filledCount = 0;

  bottleItems.forEach((bottle) => {
    if (bottle.length === numberOfColors) {
      filledCount++;
      const firstBall = bottle[0].color;
      bottle.forEach((ball) => {
        if (ball.color !== firstBall) {
          won = false;
        }
      });
    }
  });

  return won && filledCount === bottleItems.length - 2;
};

const moveColorToBottle = (
  bottleItems: BottleItem[][],
  fromIndex: number,
  toIndex: number
): BottleItem[][] => {
  const newBottleItems = bottleItems.map((bottle) => [...bottle]);

  const fromBottle = newBottleItems[fromIndex];
  const toBottle = newBottleItems[toIndex];

  if (fromBottle.length === 0) {
    return newBottleItems;
  }

  const moveColor = fromBottle[fromBottle.length - 1];

  if (
    toBottle.length === 0 ||
    toBottle[toBottle.length - 1].color === moveColor.color
  ) {
    newBottleItems[toIndex].push(moveColor);
    newBottleItems[fromIndex].pop();
  }

  return newBottleItems;
};

const shuffleBottles = (
  bottleItems: BottleItem[][],
  numberOfColors: number
): BottleItem[][] => {
  let shuffledBottles = [...bottleItems];
  do {
    const flatColors = shuffledBottles.flat();
    const shuffledColors = shuffleArray(flatColors);
    shuffledBottles = Array.from({ length: bottleItems.length }, () => []);
    shuffledColors.forEach((color, index) => {
      const bottleIndex = Math.floor(index / numberOfColors);
      shuffledBottles[bottleIndex].push(color);
    });
  } while (checkIfWon(shuffledBottles, numberOfColors));
  return shuffledBottles;
};

const Game: React.FC<Props> = () => {
  const [bottleItems, setBottleItems] = useState<BottleItem[][]>([]);
  const [level, setLevel] = useState<number>(0);
  const [numberOfColors, setNumberOfColors] = useState<number>(4);
  const [numberOfBottles, setNumberOfBottles] = useState<number>(6);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [selectedBottle, setSelectedBottle] = useState<number | null>(null);

  const startGame = useCallback(() => {
    setLevel(0);
    setNumberOfColors(4);
    setNumberOfBottles(6);
    setIsGameFinished(false);
    const initialBottles = generateInitialBottles(6, 4);
    setBottleItems(shuffleBottles(initialBottles, 4));
  }, []);

  const handleBottleClick = (index: number) => {
    console.log("handleBottleClick", index);
    if (selectedBottle === null) {
      setSelectedBottle(index);
    } else {
      if (selectedBottle !== index) {
        setBottleItems((prevBottleItems) => {
          const newBottleItems = moveColorToBottle(
            prevBottleItems,
            selectedBottle,
            index
          );
          setSelectedBottle(null);
          return newBottleItems;
        });
      } else {
        setSelectedBottle(null);
      }
    }
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (checkIfWon(bottleItems, numberOfColors)) {
      if (level + 1 === 3) {
        setIsGameFinished(true);
      } else {
        setLevel(level + 1);
        setNumberOfColors(numberOfColors + 1);
        setNumberOfBottles(numberOfBottles + 1);
        const initialBottles = generateInitialBottles(
          numberOfBottles + 1,
          numberOfColors + 1
        );
        setBottleItems(shuffleBottles(initialBottles, numberOfColors + 1));
      }
    }
  }, [bottleItems, level, numberOfColors, numberOfBottles]);

  const bottles = bottleItems.map((bottle, index) => (
    <Bottle
      key={index}
      fillItems={bottle}
      onClick={() => handleBottleClick(index)}
    />
  ));

  return <div className="game-container">{bottles}</div>;
};

export default Game;
