const BOARD_SIZE = 8;

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

  isWithinBoard(x, y) {
    // Check boundaries of the board
    return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
  }
}

export class King extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) {
          continue;
        }

        let targetX = currentX + x;
        let targetY = currentY + y;

        // Add the move only if it's within the board boundaries
        if (super.isWithinBoard(targetX, targetY)) {
          possibleMoves.push({ x: targetX, y: targetY });
        }
      }
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
  }
}

export class Rook extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [];

    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];

    for (const direction of directions) {
      let targetX = currentX + direction.x;
      let targetY = currentY + direction.y;

      while (super.isWithinBoard(targetX, targetY)) {
        possibleMoves.push({ x: targetX, y: targetY });
        targetX += direction.x;
        targetY += direction.y;
      }
    }
    return possibleMoves;
  }
}

export class Bishop extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [];

    const directions = [
      { x: -1, y: -1 },
      { x: -1, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
    ];

    for (const direction of directions) {
      let targetX = currentX + direction.x;
      let targetY = currentY + direction.y;

      while (super.isWithinBoard(targetX, targetY)) {
        possibleMoves.push({ x: targetX, y: targetY });
        targetX += direction.x;
        targetY += direction.y;
      }
    }
    return possibleMoves;
  }
}

export class Knight extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    const possibleMoves = [];

    const directions = [
      { x: currentX - 2, y: currentY - 1 },
      { x: currentX - 1, y: currentY - 2 },
      { x: currentX + 2, y: currentY - 1 },
      { x: currentX + 1, y: currentY - 2 },
      { x: currentX - 2, y: currentY + 1 },
      { x: currentX - 1, y: currentY + 2 },
      { x: currentX + 2, y: currentY + 1 },
      { x: currentX + 1, y: currentY + 2 },
    ];

    for (const direction of directions) {
      if (super.isWithinBoard(direction.x, direction.y)) {
        possibleMoves.push({ x: direction.x, y: direction.y });
      }
    }
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
