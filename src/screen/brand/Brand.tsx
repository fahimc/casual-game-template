import React, { useEffect, useRef } from "react";
import "./Brand.css";
import Logo from "../../../public/images/brand.svg";
import { useNavigate } from "react-router-dom";
const Splash: React.FC = () => {
  const timerRef = useRef<undefined | number>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigate("/splash");
    }, 4000);

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="brand">
      <div className="content">
        <img className="logo" src={Logo} />
      </div>
    </div>
  );
};

export default Splash;
