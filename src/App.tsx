import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GameProvider } from "./providers/GameProvider";
import { Board } from "./components/Board";

function App() {
  const [count, setCount] = useState(0);

  return (
    <GameProvider>
      <Board />
    </GameProvider>
  );
}

export default App;
