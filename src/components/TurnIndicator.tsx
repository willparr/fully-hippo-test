import { useGame } from "../providers/GameProvider"


export function TurnIndicator(){
  const { playerState, gameState } = useGame();
  if(gameState !== 'inprogress') return null;

  return <div>It is player {playerState}'s turn.</div>
}