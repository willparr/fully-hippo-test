import { PlayerState, useGame } from "../providers/GameProvider";
import { TurnIndicator } from "./TurnIndicator";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { checkWinner } from "../utils/winChecker";
import { WinIndicator } from "./WinIndicator";
import { GameMenu } from "./GameMenu";
import { Button } from "@mui/material";
import { ColumnFullModal } from "./ColumnFullModal";

export function Board() {
  const { boardState, gameState } = useGame();

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div style={{ width: "100%", margin: 0 }}>
      <ColumnFullModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <div>
        <GameMenu />
      </div>
      <div>
        <WinIndicator />
      </div>
      <div>
        <TurnIndicator />
      </div>
      <div style={{ width: "100%" }}>
        {(gameState === "inprogress" || gameState === "finished") &&
          boardState.map((row, x) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: 12,
                }}
                key={x}
              >
                {row.map((slot, y) => {
                  return (
                    <Cell
                      setModalOpen={setModalOpen}
                      rowIndex={x}
                      colIndex={y}
                      cellValue={slot}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

type CellProps = {
  rowIndex: number;
  colIndex: number;
  cellValue: number;
  setModalOpen: (open: boolean) => void;
};

export function Cell({ cellValue, colIndex, setModalOpen }: CellProps) {
  const {
    boardState,
    playerState,
    gameState,
    setGameState,
    setWinnerState,
    setBoardState,
    togglePlayerState,
  } = useGame();

  const handleWin = (winResult: number) => {
    setGameState("finished");
    setWinnerState(winResult.toString() as PlayerState);
  };

  return (
    <Button
      disabled={gameState === "finished"}
      key={uuid()}
      onClick={() => {
        if (gameState !== "inprogress") setGameState("inprogress");
        const result = takeTurn({ boardState, colIndex });
        // undefined means bad cell
        if (!result) {
          setModalOpen(true);
          return;
        }

        // update the board
        const newArr = Array.from(boardState);
        newArr[result.rowIndex][result.colIndex] = Number.parseInt(playerState);
        setBoardState(newArr);

        // check for wins
        const winResult = checkWinner(boardState, {
          row: result.rowIndex,
          col: result.colIndex,
        });
        if (winResult) {
          handleWin(winResult);
          return;
        }
        togglePlayerState();
      }}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background:
          cellValue === 1 ? "red" : cellValue === 2 ? "yellow" : "blue",
      }}
    />
  );
}

type TakeTurnProps = {
  boardState: number[][];
  colIndex: number;
};

function takeTurn({ boardState, colIndex }: TakeTurnProps) {
  for (let i = boardState.length - 1; i >= 0; i--) {
    if (!boardState[i][colIndex]) {
      return { colIndex: colIndex, rowIndex: i };
    }
  }
  return undefined;
}
