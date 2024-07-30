import React, { useState, useEffect, useRef } from "react";

const Character: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrame = useRef(0); // Change currentFrame to a ref
  let totalFrames = 10; // Total number of frames in the spritesheet
  const frameWidth = 64;
  let frameHeight = Math.round(2944 / 41);
  const marginTop = 0;
  const marginLeft = 0;
  let mouseIsDown = false;
  let direction = "left";

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      canvas.width = frameWidth; // Set canvas width to 64
      canvas.height = frameHeight; // Set canvas height to 46

      const spritesheet = new Image();

      const animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the position of the current frame in the spritesheet based on the direction
        let row = 0;
        let col = 0;
        let x = 0;
        let y = 0;

        if (!mouseIsDown) {
          if (direction === "left") {
            col = 0;
            x = 0;
            frameHeight = 47;
            y = 591;
          } else if (direction === "right") {
            col = 0;
            x = 0;
            frameHeight = 47;
            y = 719;
          } else if (direction === "up") {
            col = 0;
            x = 0;
            frameHeight = 46;
            y = 527;
          } else if (direction === "down") {
            col = 0;
            x = 0;
            frameHeight = 47;
            y = 655;
          }
        } else {
          col = currentFrame.current % (spritesheet.width / frameWidth);
          x = col * frameWidth + marginLeft;
          // Update the row, x, and y based on the direction
          if (direction === "left") {
            totalFrames = 9;
            frameHeight = 47;
            y = 591;
          } else if (direction === "right") {
            totalFrames = 9;
            frameHeight = 47;
            y = 719;
          } else if (direction === "up") {
            totalFrames = 9;
            frameHeight = 46;
            y = 527;
          } else if (direction === "down") {
            totalFrames = 9;
            frameHeight = 47;
            y = 655;
          }
        }
        // Draw the current frame on the canvas
        context.drawImage(
          spritesheet,
          x,
          y,
          frameWidth,
          frameHeight,
          0,
          0,
          frameWidth,
          frameHeight
        );

        // Update the current frame
        currentFrame.current = (currentFrame.current + 1) % totalFrames;
        setTimeout(animate, 1000 / 10); // Set the framerate to 30 frames per second
      };

      spritesheet.onload = () => {
        spritesheet.width = 832;
        spritesheet.height = 2944;
        animate();
      };
      spritesheet.src = "/images/game/character/blue/spritesheet.png"; // Replace with the path to your SVG spritesheet
    }
  }, []); // Add direction as a dependency to re-render when it changes

  // Handle keyboard direction change
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      direction = "left";
      mouseIsDown = true;
    } else if (event.key === "ArrowRight") {
      direction = "right";
      mouseIsDown = true;
    } else if (event.key === "ArrowUp") {
      direction = "up";
      mouseIsDown = true;
    } else if (event.key === "ArrowDown") {
      mouseIsDown = true;
      direction = "down";
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    mouseIsDown = false;
    currentFrame.current = 0;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute" }} />;
};

export default Character;
