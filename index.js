import { King, Queen, Rook, Bishop, Knight, Pawn } from "./src/pieces.js";

const board = document.querySelector("#board");
const information = document.querySelector("#information");
const cells = document.querySelectorAll(".cell");
const pieces = document.querySelectorAll(".piece");

let turn = true;

let selectedPiece = null;
let selectedCell = null;

let blackKing = new King("black");
let blackQueen = new Queen("black");
let blackRook = new Rook("black");
let blackBishop = new Bishop("black");
let blackKnight = new Knight("black");
let blackPawn = new Pawn("black");
let whiteKing = new King("white");
let whiteQueen = new Queen("white");
let whiteRook = new Rook("white");
let whiteBishop = new Bishop("white");
let whiteKnight = new Knight("white");
let whitePawn = new Pawn("white");

function startGame() {
  renderBoard();
}

function renderBoard() {
  // prettier-ignore
  const startingPosition = [
    "blackRook", "blackBishop", "blackKnight", "blackQueen", "blackKing", "blackKnight", "blackBishop", "blackRook",
    "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn", "blackPawn",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn",
    "whiteRook", "whiteBishop", "whiteKnight", "whiteQueen", "whiteKing", "whiteKnight", "whiteBishop", "whiteRook",
  ];

  // prettier-ignore
  const pieces = {
    blackKing, blackQueen, blackRook, blackBishop, blackKnight, blackPawn,
    whiteKing, whiteQueen, whiteRook, whiteBishop, whiteKnight, whitePawn,
  };

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
      const piece = pieces[pieceName].renderPiece(pieceName);
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
        selectedPiece = piece;
        selectedCell = cell;
        information.innerText = `Selected piece: ${cellXName}${cellYName}`;
        console.log(`Selected piece: { x: ${cellX}, y: ${cellY} }`);
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
  cell.appendChild(selectedPiece);
  information.innerText = `Piece moved: ${cellXName}${cellYName}`;
  console.log(`Piece moved: { x: ${cellX}, y: ${cellY} }`);

  // Change piece coordinates based on target cell
  selectedPiece.dataset.x = cellX;
  selectedPiece.dataset.y = cellY;

  // Put selected cell and selected piece to null again for next turn
  selectedPiece = null;
  selectedCell = null;

  // Change turn
  turn = !turn;
}

function checkTurn() {
  // If turn = true, white plays ; if turn = false, black plays
  if (turn) {
    return "white";
  } else {
    return "black";
  }
}

startGame();
