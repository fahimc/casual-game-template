import React from "react";

export interface BottleItem {
  color: string;
  height: number;
}
interface BottleProps {
  fillItems: BottleItem[];
  onClick?: () => void;
}

const Bottle: React.FC<BottleProps> = (props) => {
  // Implement your component logic here

  return (
    // JSX code for your component's UI goes here
    <div>
      <div className="bottle-container" onClick={props.onClick}>
        <div className="bottle-fill">
          {props.fillItems?.map((item, index) => {
            return (
              <div
                key={index}
                className="fill-part"
                style={{
                  backgroundColor: item.color,
                  height: `${item.height}%`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bottle;
