class Piece {
  constructor(name, color) {
    this.name = name;
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
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [];
    let deltaX;
    let deltaY;
    for (let i = 0; i < 8; i++) {
      deltaX = Math.abs(currentX + 1);
      deltaY = Math.abs(currentY + 1);

      possibleMoves.push({ x: deltaX, y: deltaY });
    }
    return possibleMoves;
  }
}

export class Queen extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [
      { x: 2, y: 3 },
      { x: 3, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
    ];
    return possibleMoves;
  }
}

export class Rook extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [
      { x: 2, y: 3 },
      { x: 3, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
    ];
    return possibleMoves;
  }
}

export class Bishop extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [
      { x: 2, y: 3 },
      { x: 3, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
    ];
    return possibleMoves;
  }
}

export class Knight extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [
      { x: 2, y: 3 },
      { x: 3, y: 2 },
      { x: 3, y: 4 },
      { x: 4, y: 3 },
    ];
    return possibleMoves;
  }
}

export class Pawn extends Piece {
  constructor(piece, color) {
    super(piece, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [];

    let deltaX;
    if (pieceColor === "white") {
      deltaX = currentX - 1;
    } else {
      deltaX = currentX + 1;
    }

    let deltaY = currentY;

    possibleMoves.push({ x: deltaX, y: deltaY });

    return possibleMoves;
  }
}
