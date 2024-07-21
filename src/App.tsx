import "./App.css";
import Hud from "./components/hud/Hud";
import Layer from "./components/layer/Layer";
import Modal from "./components/modal/Modal";
import Sunburst from "./components/sunburst/Sunburst";
import Game from "./example-game/Game";
function App() {
  return (
    <>
      <Layer>
        <Sunburst color="orange" />
      </Layer>
      <Layer>
        <Game />
      </Layer>
      <Layer>
        <Hud />
      </Layer>
      <Layer>{/* <Modal /> */}</Layer>
    </>
  );
}

export default App;
