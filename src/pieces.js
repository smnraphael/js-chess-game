class Piece {
  constructor(color) {
    this.color = color;
  }

  renderPiece(pieceName) {
    const piece = document.createElement("img");
    piece.classList.add("piece", pieceName, this.color);
    piece.src = `./img/${pieceName}.png`;
    return piece;
  }
}

export class King extends Piece {
  constructor(color) {
    super(color);
  }

  isValidMove(currentX, currentY, targetX, targetY) {}
}

export class Queen extends Piece {
  constructor(color) {
    super(color);
  }
}

export class Rook extends Piece {
  constructor(color) {
    super(color);
  }
}

export class Bishop extends Piece {
  constructor(color) {
    super(color);
  }
}

export class Knight extends Piece {
  constructor(color) {
    super(color);
  }
}

export class Pawn extends Piece {
  constructor(color) {
    super(color);
  }
}
