import React, { useEffect, useRef } from "react";
import "./Splash.css";
import Logo from "../../../public/images/logo.svg";
import Progress from "../../components/progress/Progress";
import { useNavigate } from "react-router-dom";
const Splash: React.FC = () => {
  const navigate = useNavigate();
  const timerRef = useRef<undefined | number>(undefined);
  const [progress, setProgress] = React.useState(0);
  const onComplete = () => {
    clearInterval(timerRef.current);
    navigate("/app");
  };

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => {
        setProgress(progress + 10);
      }, 500);
    }

    return () => clearTimeout(timerRef.current);
  }, [progress]);

  return (
    <div className="splash">
      <div className="content">
        <img className="logo" src={Logo} />
        <Progress max={100} value={progress} onComplete={onComplete} />
      </div>
    </div>
  );
};

export default Splash;
