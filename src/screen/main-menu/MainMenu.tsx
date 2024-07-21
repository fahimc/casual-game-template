import React, { useEffect } from "react";
import "./MainMenu.css";
import Logo from "../../../public/images/logo.svg";
import { useNavigate } from "react-router-dom";
import Sunburst from "../../components/sunburst/Sunburst";
import Button from "../../components/button/Button";
import Layer from "../../components/layer/Layer";
const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const onClick = () => {
    navigate("/app");
  };

  return (
    <div className="main-menu">
      <Sunburst color="blue" />
      <Layer>
        <div className="content">
          <img className="logo" src={Logo} />
          <Button color="green" size="large" onClick={onClick}>
            PLAY
          </Button>
        </div>
      </Layer>
    </div>
  );
};

export default MainMenu;
