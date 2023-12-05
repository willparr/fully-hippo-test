import { Button } from "@mui/material";
import { useGame } from "../providers/GameProvider";

export function GameMenu() {
  const { gameState, resetGame, setGameState } = useGame();
  return (
    <div>
      {(gameState === "inprogress" || gameState === "finished") && (
        <Button onClick={() => resetGame()}>New game</Button>
      )}
      {gameState !== "finished" && gameState !== "inprogress" && (
        <Button onClick={() => setGameState("inprogress")}>Start game</Button>
      )}
    </div>
  );
}
