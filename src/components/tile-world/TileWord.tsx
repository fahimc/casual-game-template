import React, { useRef, useEffect, useState } from "react";

const TILE_SIZE_VW = 10; // 10vw
const WORLD_WIDTH = 50;
const WORLD_HEIGHT = 50;

type Viewport = {
  x: number;
  y: number;
};

type Character = {
  x: number;
  y: number;
};

type Prop = {
  x: number;
  y: number;
  type: string;
};

type TileWorldProps = {};

const TileWorld: React.FC<TileWorldProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0 });
  const [tileSize, setTileSize] = useState<number>(
    (window.innerWidth * TILE_SIZE_VW) / 100
  );
  const [character, setCharacter] = useState<Character>({ x: 2, y: 2 });

  const TILE_TYPES = {
    LAND: 0,
    WATER: 1,
    BRIDGE: 2,
    CROP: 3,
  };

  const PROP_TYPES = {
    FARM: "farm",
    WINDMILL: "windmill",
  };

  const generateWorld = (): number[][] => {
    const world = Array(WORLD_HEIGHT)
      .fill(null)
      .map(() => Array(WORLD_WIDTH).fill(TILE_TYPES.WATER));

    // Define some islands and bridges
    const islands = [
      { x: 2, y: 2, width: 10, height: 10 },
      { x: 25, y: 5, width: 15, height: 10 },
      { x: 10, y: 30, width: 10, height: 10 },
    ];

    islands.forEach((island) => {
      for (let y = island.y; y < island.y + island.height; y++) {
        for (let x = island.x; x < island.x + island.width; x++) {
          world[y][x] = TILE_TYPES.LAND;
        }
      }
    });

    // Define walkable crop areas
    const crops = [{ x: 3, y: 3, width: 5, height: 5 }];

    crops.forEach((crop) => {
      for (let y = crop.y; y < crop.y + crop.height; y++) {
        for (let x = crop.x; x < crop.x + crop.width; x++) {
          world[y][x] = TILE_TYPES.CROP;
        }
      }
    });

    const bridges = [
      { x: 12, y: 7, length: 13, direction: "horizontal" },
      { x: 17, y: 20, length: 12, direction: "vertical" },
    ];

    bridges.forEach((bridge) => {
      if (bridge.direction === "horizontal") {
        for (let x = bridge.x; x < bridge.x + bridge.length; x++) {
          world[bridge.y][x] = TILE_TYPES.BRIDGE;
        }
      } else {
        for (let y = bridge.y; y < bridge.y + bridge.length; y++) {
          world[y][bridge.x] = TILE_TYPES.BRIDGE;
        }
      }
    });

    return world;
  };

  const generateProps = (): Prop[] => {
    return [
      { x: 5, y: 5, type: PROP_TYPES.FARM },
      { x: 28, y: 8, type: PROP_TYPES.WINDMILL },
    ];
  };

  const world = useRef(generateWorld());
  const props = useRef(generateProps());

  const drawWorld = (ctx: CanvasRenderingContext2D) => {
    const { x: viewportX, y: viewportY } = viewport;
    const VIEWPORT_WIDTH = Math.floor(window.innerWidth / tileSize);
    const VIEWPORT_HEIGHT = Math.floor(window.innerHeight / tileSize);

    for (let row = 0; row < VIEWPORT_HEIGHT; row++) {
      for (let col = 0; col < VIEWPORT_WIDTH; col++) {
        const tile =
          world.current[row + viewportY]?.[col + viewportX] ?? TILE_TYPES.WATER;
        switch (tile) {
          case TILE_TYPES.LAND:
            ctx.fillStyle = "#228B22"; // Green for land
            break;
          case TILE_TYPES.WATER:
            ctx.fillStyle = "#1E90FF"; // Blue for water
            break;
          case TILE_TYPES.BRIDGE:
            ctx.fillStyle = "#A0522D"; // Brown for bridge
            break;
          case TILE_TYPES.CROP:
            ctx.fillStyle = "#FFD700"; // Yellow for crops
            break;
          default:
            ctx.fillStyle = "#1E90FF"; // Default to water
        }
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }

    // Draw the props
    props.current.forEach((prop) => {
      const propX = (prop.x - viewportX) * tileSize;
      const propY = (prop.y - viewportY) * tileSize;
      switch (prop.type) {
        case PROP_TYPES.FARM:
          ctx.fillStyle = "brown";
          ctx.fillRect(propX, propY, tileSize, tileSize);
          ctx.fillStyle = "white";
          ctx.fillText("F", propX + tileSize / 4, propY + (3 * tileSize) / 4);
          break;
        case PROP_TYPES.WINDMILL:
          ctx.fillStyle = "gray";
          ctx.fillRect(propX, propY, tileSize, tileSize);
          ctx.fillStyle = "white";
          ctx.fillText("W", propX + tileSize / 4, propY + (3 * tileSize) / 4);
          break;
        default:
          break;
      }
    });

    // Draw the character
    const charX = (character.x - viewportX) * tileSize;
    const charY = (character.y - viewportY) * tileSize;
    ctx.fillStyle = "yellow";
    ctx.fillRect(charX, charY, tileSize, tileSize);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    let newViewport = { ...viewport };
    let newCharacter = { ...character };
    let moved = false;
    switch (event.key) {
      case "ArrowUp":
        if (
          newCharacter.y > 0 &&
          isWalkable(newCharacter.x, newCharacter.y - 1)
        ) {
          newCharacter.y -= 1;
          moved = true;
        }
        break;
      case "ArrowDown":
        if (
          newCharacter.y < WORLD_HEIGHT - 1 &&
          isWalkable(newCharacter.x, newCharacter.y + 1)
        ) {
          newCharacter.y += 1;
          moved = true;
        }
        break;
      case "ArrowLeft":
        if (
          newCharacter.x > 0 &&
          isWalkable(newCharacter.x - 1, newCharacter.y)
        ) {
          newCharacter.x -= 1;
          moved = true;
        }
        break;
      case "ArrowRight":
        if (
          newCharacter.x < WORLD_WIDTH - 1 &&
          isWalkable(newCharacter.x + 1, newCharacter.y)
        ) {
          newCharacter.x += 1;
          moved = true;
        }
        break;
      default:
        return;
    }
    if (moved) {
      newViewport = {
        x: Math.max(
          0,
          newCharacter.x - Math.floor(window.innerWidth / tileSize / 2)
        ),
        y: Math.max(
          0,
          newCharacter.y - Math.floor(window.innerHeight / tileSize / 2)
        ),
      };
      setCharacter(newCharacter);
      setViewport(newViewport);
    }
  };

  const handleResize = () => {
    setTileSize((window.innerWidth * TILE_SIZE_VW) / 100);
  };

  const isWalkable = (x: number, y: number): boolean => {
    const tile = world.current[y]?.[x];
    const prop = props.current.find((p) => p.x === x && p.y === y);
    return tile !== TILE_TYPES.WATER && !prop;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      drawWorld(ctx);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [viewport, tileSize, character]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      drawWorld(ctx);
    }
  }, [viewport, tileSize, character]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default TileWorld;
