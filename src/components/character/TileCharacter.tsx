import React, { useEffect } from "react";

type CharacterProps = {
  x: number;
  y: number;
  tileSize: number;
  onMove: (newX: number, newY: number) => void;
  isWalkable: (x: number, y: number) => boolean;
};

const Character: React.FC<CharacterProps> = ({
  x,
  y,
  tileSize,
  onMove,
  isWalkable,
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    let newX = x;
    let newY = y;

    switch (event.key) {
      case "ArrowUp":
        newY = y - 1;
        break;
      case "ArrowDown":
        newY = y + 1;
        break;
      case "ArrowLeft":
        newX = x - 1;
        break;
      case "ArrowRight":
        newX = x + 1;
        break;
      default:
        return;
    }

    if (isWalkable(newX, newY)) {
      onMove(newX, newY);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [x, y, isWalkable]);

  return (
    <div
      style={{
        position: "absolute",
        left: x * tileSize,
        top: y * tileSize,
        width: tileSize,
        height: tileSize,
        backgroundColor: "yellow",
      }}
    />
  );
};

export default Character;
