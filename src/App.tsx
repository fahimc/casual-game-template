import "./App.css";
import Hud from "./components/hud/Hud";
import Layer from "./components/layer/Layer";
import Modal from "./components/modal/Modal";
import Sunburst from "./components/sunburst/Sunburst";
import Game from "./example-game/BottleGame";
function App() {
  return (
    <>
      <Layer>
        <Sunburst color="orange" />
      </Layer>
      <Layer>
        <Game />
      </Layer>
      <Layer disableEvents={true}>
        <Hud />
      </Layer>
      <Layer disableEvents={true}>{/* <Modal /> */}</Layer>
    </>
  );
}

export default App;
