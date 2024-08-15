
// Select the grid element from the HTML and store it in a variable
const grid = document.getElementById('grid');

// Select the turn element from the HTML and store it in a variable
let turn = document.getElementById('turn');

// Set the current player to 'X'
let currentPlayer = "X";

// Create an array of length 9 and fill it with null values
let arr = Array(9).fill(null);

/**
 * Check if there is a winner in the game
 * If there is a winner, display a message with the winner's name and a button to play again
 * If there is a tie, display a message with a button to play again
 */
function checkWinner() {
  // Check all possible winning combinations
  if (
    (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2]) ||
    (arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5]) ||
    (arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6]) ||
    (arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7]) ||
    (arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8]) ||
    (arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6])
  ) {
    // Display a message with the winner's name and a button to play again
    grid.innerHTML = `<h4>Congratulations!<br/>
    Winner is ${currentPlayer}</h4>
    <button onclick="location.reload()">Play Again</button>`;
    return;
  }

  // Check if the game is a tie
  if (!arr.some((e) => e === null)) {
    // Display a message with a button to play again
    grid.innerHTML = `<h4>It's a tie.Play again</h4>
    <button onclick="location.reload()">Play Again</button>`;
    return;
  }
}


 //Handle the click event on a grid cell

function handleClick(el) {
  // Get the id of the clicked element and convert it to a number
  const id = Number(el.id);

  // Check if the cell is already filled
  if (arr[id] !== null) return;

  // Fill the cell with the current player's symbol
  arr[id] = currentPlayer;
  el.innerText = currentPlayer;

  // Check if there is a winner
  checkWinner();

  // Switch to the next player
    checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Update the turn message
  turn.innerText = `${currentPlayer}'s turn`;
}



