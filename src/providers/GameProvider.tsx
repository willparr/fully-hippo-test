import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const initialBoardState: number[][] = new Array(7)
  .fill(0)
  .map(() => new Array(6).fill(0));

type GameContextType = {
  boardState: number[][];
  playerState: PlayerState;
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  togglePlayerState: () => void;
  setBoardState: Dispatch<SetStateAction<number[][]>>;
  setWinnerState: Dispatch<SetStateAction<PlayerState | undefined>>;
  winnerState: PlayerState | undefined;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType>({
  boardState: initialBoardState,
  playerState: "1",
  gameState: "ready",
  togglePlayerState: () => {},
  setBoardState: () => {},
  setGameState: () => {},
  winnerState: undefined,
  setWinnerState: () => {},
  resetGame: () => {},
});

export type PlayerState = "1" | "2";
type GameState = "ready" | "inprogress" | "finished";

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState<GameState>("ready");
  const [playerState, setPlayerState] = useState<PlayerState>("1");
  const [boardState, setBoardState] = useState([...initialBoardState]);
  const [winnerState, setWinnerState] = useState<PlayerState | undefined>(
    undefined
  );

  const resetGame = () => {
    setBoardState(() => new Array(7).fill(0).map(() => new Array(6).fill(0)));
    setGameState("ready");
    setPlayerState("1");
    setWinnerState(undefined);
  };

  const togglePlayerState = () => {
    if (playerState === "1") {
      setPlayerState("2");
      return;
    }
    if (playerState === "2") {
      setPlayerState("1");
      return;
    }
  };

  const value = {
    winnerState,
    setWinnerState,
    togglePlayerState,
    setBoardState,
    boardState: boardState,
    setPlayerState,
    playerState: playerState,
    setGameState,
    gameState: gameState,
    resetGame,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
