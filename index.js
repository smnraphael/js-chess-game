import { King, Queen, Rook, Bishop, Knight, Pawn } from "./src/pieces.js";

const board = document.querySelector("#board");
const informationOne = document.querySelector("#information-one");
const informationTwo = document.querySelector("#information-two");
const blackCemetery = document.querySelector("#black-cemetery");
const whiteCemetery = document.querySelector("#white-cemetery");
const blackTimer = document.querySelector("#black-timer");
const whiteTimer = document.querySelector("#white-timer");
const blackResign = document.querySelector("#black-resign");
const whiteResign = document.querySelector("#white-resign");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");

const movePiece = new Audio("./sounds/move.mp3");
const capturePiece = new Audio("./sounds/capture.mp3");
const notify = new Audio("./sounds/notify.mp3");
const end = new Audio("./sounds/end.mp3");

let gameRunning = false;
let turn = true;
let gameOver = false;

let whiteCounter = 1800;
let blackCounter = 1800;
let whiteTimerID;
let blackTimerID;

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
  // Not allow moves if game didn't start
  if (!gameRunning) {
    return;
  }

  // Not allow moves if Game Over
  if (gameOver) {
    return;
  }

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
          // Add styling for valid moves
          document
            .querySelector(`.cell[data-x="${move.x}"][data-y="${move.y}"]`)
            .classList.add("legal");
        }
      } else {
        informationTwo.innerText = "Not your turn";
        console.log("Not your turn");
        notify.play();
      }
    } else {
      informationTwo.innerText = "Select a piece";
      console.log("Select a piece");
      notify.play();
    }
    return;
  }

  // Deselect a piece when clicking on it twice
  if (cell === selectedCell) {
    selectedPiece = null;
    selectedCell = null;
    informationOne.innerText = "Piece deselected";
    console.log("Piece deselected");

    // Remove styling for valid moves
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
    const targetPiece = cell.querySelector(".piece");
    const checkPiece = selectedPiece.classList[1];

    // Pawn moves
    if (
      checkPiece.includes("Pawn") &&
      Math.abs(cellX - selectedCellX) === 1 &&
      !targetPiece
    ) {
      // Move pawn to target cell
      cell.appendChild(selectedPiece);
      document
        .querySelectorAll(".legal")
        .forEach((cell) => cell.classList.remove("legal"));

      // Display move
      const pieceName = selectedPiece.classList[1];
      informationOne.innerText = `${pieceName} moved: ${cellXName}${cellYName}`;
      informationTwo.innerText = "";

      // Change piece coordinates based on target cell
      selectedPiece.dataset.x = cellX;
      selectedPiece.dataset.y = cellY;

      // Put selectedCell and selectedPiece to null again for next turn
      selectedPiece = null;
      selectedCell = null;

      movePiece.play();

      // Change turn
      turn = !turn;
    }

    // Promote whitePawn to whiteQueen
    else if (checkPiece === "whitePawn" && cellX === 0) {
      const newPiece = new Queen("queen", "white");
      cell.appendChild(newPiece.renderPiece("whiteQueen"));
      remove(selectedPiece);
      // Display promotion
      informationOne.innerText = "whitePawn promoted to whiteQueen";

      // Add dead piece to cemetery
      if (targetPiece) {
        cell.removeChild(targetPiece);
        if (targetPiece.classList.contains("white")) {
          whiteCemetery.appendChild(targetPiece);
        } else {
          blackCemetery.appendChild(targetPiece);
        }

        capturePiece.play();
      }

      movePiece.play();
      notify.play();

      // Remove styling for valid moves
      document
        .querySelectorAll(".legal")
        .forEach((cell) => cell.classList.remove("legal"));

      // Put selectedCell and selectedPiece to null again for next turn
      selectedPiece = null;
      selectedCell = null;

      // Change turn
      turn = !turn;
    }

    // Promote blackPawn to blackQueen
    else if (checkPiece === "blackPawn" && cellX === 7) {
      const newPiece = new Queen("queen", "black");
      cell.appendChild(newPiece.renderPiece("blackQueen"));
      remove(selectedPiece);
      // Display promotion
      informationOne.innerText = "blackPawn promoted to blackQueen";

      // Add dead piece to cemetery
      if (targetPiece) {
        cell.removeChild(targetPiece);
        if (targetPiece.classList.contains("white")) {
          whiteCemetery.appendChild(targetPiece);
        } else {
          blackCemetery.appendChild(targetPiece);
        }

        capturePiece.play();
      }

      movePiece.play();
      notify.play();

      // Remove styling for valid moves
      document
        .querySelectorAll(".legal")
        .forEach((cell) => cell.classList.remove("legal"));

      // Put selectedCell and selectedPiece to null again for next turn
      selectedPiece = null;
      selectedCell = null;

      // Change turn
      turn = !turn;
    }

    // Other moves
    else {
      // Add dead piece to cemetery
      if (targetPiece) {
        cell.removeChild(targetPiece);
        if (targetPiece.classList.contains("white")) {
          whiteCemetery.appendChild(targetPiece);
        } else {
          blackCemetery.appendChild(targetPiece);
        }

        capturePiece.play();
      }

      movePiece.play();

      // Remove styling for valid moves
      cell.appendChild(selectedPiece);
      document
        .querySelectorAll(".legal")
        .forEach((cell) => cell.classList.remove("legal"));

      // Display move
      const pieceName = selectedPiece.classList[1];
      informationOne.innerText = `${pieceName} moved: ${cellXName}${cellYName}`;
      console.log(`${pieceName} moved: { x: ${cellX}, y: ${cellY} }`);
      informationTwo.innerText = "";

      // Change piece coordinates based on target cell
      selectedPiece.dataset.x = cellX;
      selectedPiece.dataset.y = cellY;

      // Put selectedCell and selectedPiece to null again for next turn
      selectedPiece = null;
      selectedCell = null;

      // Change turn
      turn = !turn;
    }
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

function remove(element) {
  const elementToRemove = element;
  elementToRemove.remove();
}

function startTimers() {
  whiteTimerID = setInterval(() => {
    if (turn && !gameOver) {
      whiteCounter--;
      updateTimerDisplay(whiteCounter, whiteTimer);
      if (whiteCounter === 0) {
        clearInterval(whiteTimerID);
        informationOne.innerText = "Black wins!";
        informationTwo.innerText = "White player ran out of time";
        console.log("Black wins!");
        console.log("White player ran out of time");
        gameOver = true;
        stopTimers();
        end.play();
      }
    }
  }, 1000);

  blackTimerID = setInterval(() => {
    if (!turn && !gameOver) {
      blackCounter--;
      updateTimerDisplay(blackCounter, blackTimer);
      if (blackCounter === 0) {
        clearInterval(blackTimerID);
        informationOne.innerText = "White wins!";
        informationTwo.innerText = "Black player ran out of time";
        console.log("White wins!");
        console.log("Black player ran out of time");
        gameOver = true;
        stopTimers();
        end.play();
      }
    }
  }, 1000);
}

function updateTimerDisplay(time, displayElement) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  displayElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function stopTimers() {
  clearInterval(whiteTimerID);
  clearInterval(blackTimerID);
  turn = null;
}

blackResign.addEventListener("click", (e) => {
  informationOne.innerText = "White wins!";
  informationTwo.innerText = "Black resigned";
  console.log("Black resigned");
  gameOver = true;
  stopTimers();
  disablePlayerActions();
});

whiteResign.addEventListener("click", (e) => {
  informationOne.innerText = "Black wins!";
  informationTwo.innerText = "White resigned";
  console.log("White resigned");
  gameOver = true;
  stopTimers();
  disablePlayerActions();
});

function disablePlayerActions() {
  // If the game is over, remove event listeners from all cells
  if (gameOver) {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.removeEventListener("click", movePieces);
    });
    end.play();
  }
}

renderBoard();

// Start the game
startButton.addEventListener("click", () => {
  gameRunning = true;
  startTimers();
  startButton.setAttribute("disabled", "disabled");
  startButton.style.cursor = "default";
});

// Reset the game
resetButton.addEventListener("click", () => {
  // Clear the board
  board.innerHTML = "";

  // Reset timers
  clearInterval(whiteTimerID);
  clearInterval(blackTimerID);
  whiteCounter = 1800;
  blackCounter = 1800;
  updateTimerDisplay(whiteCounter, whiteTimer);
  updateTimerDisplay(blackCounter, blackTimer);

  // Reset game variables
  gameRunning = false;
  turn = true;
  gameOver = false;
  selectedPiece = null;
  selectedCell = null;
  legalMove = null;

  // Render the board again
  renderBoard();

  // Clear cemeteries
  blackCemetery.innerText = "";
  whiteCemetery.innerText = "";

  // Enable start button
  startButton.removeAttribute("disabled");
  startButton.style.cursor = "pointer";

  // Clear information messages
  informationOne.innerText = "";
  informationTwo.innerText = "";
});
