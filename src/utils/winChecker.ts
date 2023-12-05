import { get } from "lodash";
type CheckLineProps = {
  a: number;
  b: number;
  c: number;
  d: number;
};
function checkLine(a?: number, b?: number, c?: number, d?: number) {
  // Check first cell non-zero and all cells match
  return !!a && a == b && a == c && a == d;
}

export function checkWinner(
  board: number[][],
  lastMove: { row: number; col: number }
) {
  const { row, col } = lastMove;
  // check four down from current
  if (
    checkLine(
      get(board, `[${row}][${col}]`, undefined),
      get(board, `[${row}][${col - 1}]`, undefined),
      get(board, `[${row}][${col - 2}]`, undefined),
      get(board, `[${row}][${col - 3}]`, undefined)
    )
  ) {
    return board[row][col];
  }
  // check four left from current
  if (
    checkLine(
      get(board, `[${row}][${col}]`, undefined),
      get(board, `[${row - 1}][${col}]`, undefined),
      get(board, `[${row - 2}][${col}]`, undefined),
      get(board, `[${row - 3}][${col}]`, undefined)
    )
  ) {
    return board[row][col];
  }
  // check four right from current
  if (
    checkLine(
      get(board, `[${row}][${col}]`, undefined),
      get(board, `[${row + 1}][${col}]`, undefined),
      get(board, `[${row + 2}][${col}]`, undefined),
      get(board, `[${row + 3}][${col}]`, undefined)
    )
  ) {
    return board[row][col];
  }
  // check four diag right from current
  if (
    checkLine(
      get(board, `[${row}][${col}]`, undefined),
      get(board, `[${row + 1}][${col - 1}]`, undefined),
      get(board, `[${row + 2}][${col - 2}]`, undefined),
      get(board, `[${row + 3}][${col - 3}]`, undefined)
    )
  ) {
    return board[row][col];
  }
  // check four diag left from current
  if (
    checkLine(
      get(board, `[${row}][${col}]`, undefined),
      get(board, `[${row - 1}][${col - 1}]`, undefined),
      get(board, `[${row - 2}][${col - 2}]`, undefined),
      get(board, `[${row - 3}][${col - 3}]`, undefined)
    )
  ) {
    return board[row][col];
  }
  return undefined;
}
