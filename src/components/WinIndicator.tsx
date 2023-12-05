import { useGame } from "../providers/GameProvider";

export function WinIndicator() {
  const { winnerState } = useGame();
  if (!winnerState) return null;
  return <h2>Player {winnerState} won!</h2>;
}
