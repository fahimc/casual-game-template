import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Progress from "./components/Progress";
import Splash from "./screen/splash/Splash";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="sunburst"></div>
      <div className="app">
        <Splash />
      </div>
    </>
  );
}

export default App;
