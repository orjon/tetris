/* global Piece */
class Bishop extends Piece { // eslint-disable-line no-unused-vars
  constructor(color) {
    super(color, [
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    ]);
  }
}