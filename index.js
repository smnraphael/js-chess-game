import { King, Queen, Rook, Bishop, Knight, Pawn } from "./src/pieces.js";

const board = document.querySelector("#board");
const information = document.querySelector("#information");
const cells = document.querySelectorAll(".cell");
const pieces = document.querySelectorAll(".piece");

let turn = true;

let selectedPiece = null;
let selectedCell = null;
let legalMove = null;

let blackKing = new King("king", "black");
let blackQueen = new Queen("queen", "black");
let blackRook = new Rook("rook", "black");
let blackBishop = new Bishop("bishop", "black");
let blackKnight = new Knight("knight", "black");
let blackPawn = new Pawn("pawn", "black");
let whiteKing = new King("king", "white");
let whiteQueen = new Queen("queen", "white");
let whiteRook = new Rook("rook", "white");
let whiteBishop = new Bishop("bishop", "white");
let whiteKnight = new Knight("knight", "white");
let whitePawn = new Pawn("pawn", "white");

// prettier-ignore
const piecesClass = {
  blackKing, blackQueen, blackRook, blackBishop, blackKnight, blackPawn,
  whiteKing, whiteQueen, whiteRook, whiteBishop, whiteKnight, whitePawn,
};

function startGame() {
  renderBoard();
}

function renderBoard() {
  // prettier-ignore
  const startingPosition = [
    "blackRook", "blackBishop", "blackKnight", "blackQueen", "blackKing", "blackKnight", "blackBishop", "blackRook",
    "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn",
    "", "", "", "", "", "", "", "",
    "", "", "", "whiteKing", "", "blackKing", "", "",
    "", "", "whiteRook", "", "", "blackRook", "", "",
    "", "", "", "", "", "", "", "",
    "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn",
    "whiteRook", "whiteBishop", "whiteKnight", "whiteQueen", "whiteKing", "whiteKnight", "whiteBishop", "whiteRook",
  ];

  // Iterate over the startPosition array to create the board
  for (let i = 0; i < startingPosition.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.append(cell);

    const row = Math.floor(i / 8);
    const col = i % 8;

    // Assign coordinates to a cell
    cell.dataset.x = row;
    cell.dataset.y = col;

    // Assign name to a cell
    cell.dataset.row = String.fromCharCode(97 + col);
    cell.dataset.col = 8 - row;
    const p = document.createElement("p");
    p.innerText = `${cell.dataset.row}${cell.dataset.col}`;
    cell.append(p);

    // Add classes for checkboard's colors
    if ((row + col) % 2 === 0) {
      cell.classList.add("beige");
    } else {
      cell.classList.add("green");
    }

    // Place pieces on the board
    const pieceName = startingPosition[i];
    if (pieceName !== "") {
      const piece = piecesClass[pieceName].renderPiece(pieceName);
      cell.append(piece);
    }

    // Call the movePiece() function when clicking on a cell
    cell.addEventListener("click", () => {
      movePieces(cell);
    });
  }
}

function movePieces(cell) {
  // Get cell coordinates
  const cellX = +cell.dataset.x;
  const cellY = +cell.dataset.y;

  // Get cell name
  const cellXName = cell.dataset.row;
  const cellYName = cell.dataset.col;

  // Check if a piece not already assigned to selectedPiece variable
  if (!selectedPiece) {
    const piece = cell.querySelector(".piece");
    const pieceName = piece.classList[1];

    // Check if there is a piece in the cell
    if (piece) {
      let pieceColor = "";

      // Check the piece color
      if (piece.classList.contains("white")) {
        pieceColor = "white";
      } else {
        pieceColor = "black";
      }

      // Compare piece color to turn
      // If equal, move piece ; if not equal, refuse move
      if (pieceColor === checkTurn()) {
        // Retrieve isValidMove method
        console.log(pieceName);
        const validMove = piecesClass[pieceName].checkValidMove(
          pieceName,
          pieceColor,
          cellX,
          cellY
        );

        // Assign legaMove variable to validMove
        legalMove = validMove;
        console.log(legalMove);
        for (const move of legalMove) {
          console.log(move);
        }

        // Assign the temporary variables
        selectedPiece = piece;
        selectedCell = cell;
        information.innerText = `${pieceName} selected: ${cellXName}${cellYName}`;
        console.log(`${pieceName} selected: { x: ${cellX}, y: ${cellY} }`);
      } else {
        information.innerText = "Not your turn";
        console.log("Not your turn");
      }
    }
    return;
  }

  // Delesect a piece when clicking on it twice
  if (cell === selectedCell) {
    selectedPiece = null;
    selectedCell = null;
    information.innerText = "Piece deselected";
    console.log("Piece deselected");
    return;
  }

  // Add selected piece to target cell
  const selectedCellX = cell.dataset.x;
  const selectedCellY = cell.dataset.y;
  const selectedCellPosition = { x: +selectedCellX, y: +selectedCellY };

  const isLegalMove = legalMove.find((oneLegalMove) =>
    samePosition(oneLegalMove, selectedCellPosition)
  );
  console.log(`Move accepted`);

  if (isLegalMove) {
    cell.appendChild(selectedPiece);
    const piece = cell.querySelector(".piece");
    const pieceName = piece.classList[1];
    information.innerText = `${pieceName} moved: ${cellXName}${cellYName}`;
    console.log(`${pieceName} moved: { x: ${cellX}, y: ${cellY} }`);
    // Change piece coordinates based on target cell
    selectedPiece.dataset.x = cellX;
    selectedPiece.dataset.y = cellY;

    // Put selected cell and selected piece to null again for next turn
    selectedPiece = null;
    selectedCell = null;

    // Change turn
    turn = !turn;
  } else {
    information.innerText = "Not a valid move";
    console.log("Error");
  }
}

function checkTurn() {
  // If turn = true, white plays ; if turn = false, black plays
  if (turn) {
    return "white";
  } else {
    return "black";
  }
}

function samePosition(legalMove, selectedCellPosition) {
  return JSON.stringify(legalMove) === JSON.stringify(selectedCellPosition);
}

startGame();
