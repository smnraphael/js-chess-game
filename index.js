import { King, Queen, Rook, Bishop, Knight, Pawn } from "./src/pieces.js";

const board = document.querySelector("#board");
const informationOne = document.querySelector("#information-one");
const informationTwo = document.querySelector("#information-two");
const cemetery = document.querySelector("#cemetery");

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
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn", "whitePawn",
    "whiteRook", "whiteBishop", "whiteKnight", "whiteQueen", "whiteKing", "whiteKnight", "whiteBishop", "whiteRook",
  ];

  // Iterate over startPosition array to create board
  for (let i = 0; i < startingPosition.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.append(cell);

    const row = Math.floor(i / 8);
    const col = i % 8;

    // Assign coordinates to cells
    cell.dataset.x = row;
    cell.dataset.y = col;

    // Assign name to cells
    cell.dataset.row = String.fromCharCode(97 + col);
    cell.dataset.col = 8 - row;
    const p = document.createElement("p");
    p.innerText = `${cell.dataset.row}${cell.dataset.col}`;
    cell.append(p);

    // Add classes for checkboard colors
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

    // Call movePiece() function when clicking on a cell
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
    if (piece) {
      // Find piece name for later use
      const pieceName = piece.classList[1];

      // Check the piece color
      let pieceColor = "";
      if (piece.classList.contains("white")) {
        pieceColor = "white";
      } else {
        pieceColor = "black";
      }

      // Compare piece color to turn
      // If equal, move piece ; if not equal, refuse move
      if (pieceColor === checkTurn()) {
        // Retrieve checkValidMove method
        const validMove = piecesClass[pieceName].checkValidMove(
          pieceName,
          pieceColor,
          cellX,
          cellY
        );

        // Assign the temporary variables
        selectedPiece = piece;
        selectedCell = cell;
        informationOne.innerText = `${pieceName} selected: ${cellXName}${cellYName}`;
        console.log(`${pieceName} selected: { x: ${cellX}, y: ${cellY} }`);
        informationTwo.innerText = "";

        // Assign legalMove variable to validMove
        legalMove = validMove;
        console.log(legalMove);
        for (const move of legalMove) {
          document
            .querySelector(`.cell[data-x="${move.x}"][data-y="${move.y}"]`)
            .classList.add("legal");
        }
      } else {
        informationTwo.innerText = "Not your turn";
        console.log("Not your turn");
      }
    } else {
      informationTwo.innerText = "Select a piece";
      console.log("Select a piece");
    }
    return;
  }

  // Deselect a piece when clicking on it twice
  if (cell === selectedCell) {
    selectedPiece = null;
    selectedCell = null;
    informationTwo.innerText = "Piece deselected";
    console.log("Piece deselected");
    document
      .querySelectorAll(".legal")
      .forEach((cell) => cell.classList.remove("legal"));

    return;
  }

  // Create variable for selected cell position
  const selectedCellX = cell.dataset.x;
  const selectedCellY = cell.dataset.y;
  const selectedCellPosition = { x: +selectedCellX, y: +selectedCellY };

  // Compare target cell to valid moves
  const isLegalMove = legalMove.find((oneLegalMove) =>
    samePosition(oneLegalMove, selectedCellPosition)
  );

  if (isLegalMove) {
    // Move dead piece to cemetery
    const targetPiece = cell.querySelector(".piece");
    if (targetPiece) {
      cell.removeChild(targetPiece);
      cemetery.appendChild(targetPiece);
    }
    // Move piece to new cell
    cell.appendChild(selectedPiece);
    document
      .querySelectorAll(".legal")
      .forEach((cell) => cell.classList.remove("legal"));

    // Display move on the screen
    const pieceName = selectedPiece.classList[1];
    informationOne.innerText = `${pieceName} moved: ${cellXName}${cellYName}`;
    console.log(`${pieceName} moved: { x: ${cellX}, y: ${cellY} }`);
    informationTwo.innerText = "";

    // Change piece coordinates based on target cell
    selectedPiece.dataset.x = cellX;
    selectedPiece.dataset.y = cellY;

    // Put selected cell and selected piece to null again for next turn
    selectedPiece = null;
    selectedCell = null;

    // Change turn
    turn = !turn;
  } else {
    informationTwo.innerText = "Not a valid move";
    console.log("Not a valid move");
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
