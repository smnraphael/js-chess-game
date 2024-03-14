const BOARD_SIZE = 8;

class Piece {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.board = document.getElementById("board");
  }

  renderPiece(pieceName) {
    // Create piece
    const piece = document.createElement("img");
    piece.classList.add("piece", pieceName, this.color);
    piece.src = `./images/${pieceName}.png`;
    return piece;
  }

  isWithinBoard(x, y) {
    // Check boundaries of the board
    return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
  }

  hasObstacle(targetX, targetY) {
    const piece = this.board.querySelector(
      `.cell[data-x="${targetX}"][data-y="${targetY}"] img`
    );
    return piece;
  }

  hasSameColor(targetPieceColor) {
    return this.color !== targetPieceColor;
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

      if (this.isWithinBoard(targetX, targetY)) {
        const hasObstacle = this.hasObstacle(targetX, targetY);
        const targetPieceColor = hasObstacle && hasObstacle.classList[2];
        if (!hasObstacle || this.hasSameColor(targetPieceColor)) {
          possibleMoves.push({ x: targetX, y: targetY });
        }
      }
    }
    return possibleMoves;
  }

  isInCheck(opponentPieces) {
    const kingPosition = { x: this.currentX, y: this.currentY };

    for (const opponentPiece of opponentPieces) {
      const possibleMoves = opponentPiece.checkValidMove();
      for (const move of possibleMoves) {
        if (move.x === kingPosition.x && move.y === kingPosition.y) {
          return true;
        }
      }
    }
    return false;
  }
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
        const hasObstacle = this.hasObstacle(targetX, targetY);
        const targetPieceColor = hasObstacle && hasObstacle.classList[2];
        if (hasObstacle) {
          if (this.hasSameColor(targetPieceColor)) {
            possibleMoves.push({ x: targetX, y: targetY });
          }
          break;
        } else {
          possibleMoves.push({ x: targetX, y: targetY });
        }

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

      while (this.isWithinBoard(targetX, targetY)) {
        const hasObstacle = this.hasObstacle(targetX, targetY);
        const targetPieceColor = hasObstacle && hasObstacle.classList[2];
        if (hasObstacle) {
          if (this.hasSameColor(targetPieceColor)) {
            possibleMoves.push({ x: targetX, y: targetY });
          }
          break;
        } else {
          possibleMoves.push({ x: targetX, y: targetY });
        }

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

      while (this.isWithinBoard(targetX, targetY)) {
        const hasObstacle = this.hasObstacle(targetX, targetY);
        const targetPieceColor = hasObstacle && hasObstacle.classList[2];
        if (hasObstacle) {
          if (this.hasSameColor(targetPieceColor)) {
            possibleMoves.push({ x: targetX, y: targetY });
          }
          break;
        } else {
          possibleMoves.push({ x: targetX, y: targetY });
        }

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
      { x: currentX + 2, y: currentY + 1 }, // Down-Down-Right
      { x: currentX + 1, y: currentY + 2 }, // Down-Right
    ];

    for (const direction of directions) {
      const targetX = direction.x;
      const targetY = direction.y;

      if (this.isWithinBoard(targetX, targetY)) {
        const hasObstacle = this.hasObstacle(targetX, targetY);
        const targetPieceColor = hasObstacle && hasObstacle.classList[2];
        if (!hasObstacle || this.hasSameColor(targetPieceColor)) {
          possibleMoves.push({ x: targetX, y: targetY });
        }
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

    let targetX;
    if (pieceColor === "white") {
      targetX = currentX - 1;
    } else {
      targetX = currentX + 1;
    }
    let targetY = currentY;

    if (this.isWithinBoard(targetX, targetY)) {
      if (!this.hasObstacle(targetX, targetY)) {
        possibleMoves.push({ x: targetX, y: targetY });

        // First move
        if (
          (pieceColor === "white" && currentX === 6) ||
          (pieceColor === "black" && currentX === 1)
        ) {
          let doubletargetX;
          if (pieceColor === "white") {
            doubletargetX = currentX - 2;
          } else {
            doubletargetX = currentX + 2;
          }

          if (
            this.isWithinBoard(doubletargetX, targetY) &&
            !this.hasObstacle(doubletargetX, targetY)
          ) {
            possibleMoves.push({ x: doubletargetX, y: targetY });
          }
        }
      }

      // Assign diagonals moves to eat opponent pieces
      let rightDiagonal = currentY + 1;
      let leftDiagonal = currentY - 1;

      // Left diagonal
      if (this.isWithinBoard(targetX, leftDiagonal)) {
        if (this.hasObstacle(targetX, leftDiagonal)) {
          const hasObstacle = this.hasObstacle(targetX, leftDiagonal);
          const targetPieceColor = hasObstacle && hasObstacle.classList[2];
          if (this.hasSameColor(targetPieceColor))
            possibleMoves.push({ x: targetX, y: leftDiagonal });
        }
      }

      // Right diagonal
      if (this.isWithinBoard(targetX, rightDiagonal)) {
        if (this.hasObstacle(targetX, rightDiagonal)) {
          const hasObstacle = this.hasObstacle(targetX, rightDiagonal);
          const targetPieceColor = hasObstacle && hasObstacle.classList[2];
          if (this.hasSameColor(targetPieceColor))
            possibleMoves.push({ x: targetX, y: rightDiagonal });
        }
      }
    }
    return possibleMoves;
  }
}
