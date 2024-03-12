const BOARD_SIZE = 8;

class Piece {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  renderPiece(pieceName) {
    // Create the piece
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

    let directions = [
      { x: -1, y: 0 }, // Up
      { x: -1, y: 1 }, // Up-Right
      { x: 0, y: 1 }, // Right
      { x: 1, y: 1 }, // Down-Right
      { x: 1, y: 0 }, // Down
      { x: 1, y: -1 }, // Down-Left
      { x: 0, y: -1 }, // Left
      { x: -1, y: -1 }, // Up-Left
    ];

    for (const direction of directions) {
      let targetX = currentX + direction.x;
      let targetY = currentY + direction.y;
      possibleMoves.push({ x: targetX, y: targetY });
      targetX += direction.x;
      targetY += direction.y;
    }

    return possibleMoves;
  }

  isChecked() {}
}

export class Queen extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [];

    let directions = [
      { x: -1, y: 0 }, // Up
      { x: -1, y: 1 }, // Up-Right
      { x: 0, y: 1 }, // Right
      { x: 1, y: 1 }, // Down-Right
      { x: 1, y: 0 }, // Down
      { x: 1, y: -1 }, // Down-Left
      { x: 0, y: -1 }, // Left
      { x: -1, y: -1 }, // Up-Left
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

export class Rook extends Piece {
  constructor(name, color) {
    super(name, color);
  }

  checkValidMove(pieceName, pieceColor, currentX, currentY) {
    let possibleMoves = [];

    const directions = [
      { x: -1, y: 0 }, // Up
      { x: 1, y: 0 }, // Down
      { x: 0, y: -1 }, // Left
      { x: 0, y: 1 }, // Right
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
      { x: -1, y: 1 }, // Up-Right
      { x: 1, y: -1 }, // Down-Right
      { x: 1, y: 1 }, // Down-Left
      { x: -1, y: -1 }, // Up-Left
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
      { x: currentX - 2, y: currentY - 1 }, // Up-Up-Left
      { x: currentX - 1, y: currentY - 2 }, // Up-Left
      { x: currentX + 2, y: currentY - 1 }, // Down-Down-Left
      { x: currentX + 1, y: currentY - 2 }, // Down-Left
      { x: currentX - 2, y: currentY + 1 }, // Up-Up-Right
      { x: currentX - 1, y: currentY + 2 }, // Up-Right
      { x: currentX + 2, y: currentY + 1 }, // Down-Down-Left
      { x: currentX + 1, y: currentY + 2 }, // Down-Left
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
