import React, { CSSProperties } from "react";
import "./Sunburst.css";

interface SunburstProps {
  color: "blue" | "orange"; // Add a prop for the gradient color
}

const Sunburst: React.FC<SunburstProps> = (props: SunburstProps) => {
  const { color } = props;
  let lightColor = `--sunburst-light-${color}`;
  let darkColor = `--sunburst-dark-${color}`;

  // Add your component logic here

  const sunburstStyle: CSSProperties = {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: 0,
    backgroundPosition: "center top",
    backgroundColor: "var(--blue-light)",
    backgroundSize: "100% 200%",
    backgroundImage: `linear-gradient(
        172deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        157deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        142deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        127deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        112deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        97deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        82deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        67deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        52deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        37deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        22deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        7deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        -8deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        -23deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        -38deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        -53deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      ),
      linear-gradient(
        -68deg,
        transparent 50%,
        var(${lightColor}) 50%,
        var(${lightColor})
      ),
      linear-gradient(
        -83deg,
        transparent 50%,
        var(${darkColor}) 50%,
        var(${darkColor})
      )`,

    minHeight: "100%",
  };

  return <div className="sunburst" style={sunburstStyle}></div>;
};

export default Sunburst;
