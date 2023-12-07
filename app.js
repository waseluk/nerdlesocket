
//dictionary 
const dictionary = ['stark', 'force'];
const state = {
    //word from dictionary randomise secret
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];

        }
    }
}


//drawbox
function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;

}

//drawgrid
function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    //col row
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }
    container.appendChild(grid);
}
//const gridcopy structuredClone(grid) --??

//keyboard bindings
function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
      const key = e.key;
      if (key === "Enter") {
        if (state.currentCol === 5) {
          const word = getCurrentWord();
          //new input socket
          if (word === "") return 
          console.log(word)
          //socket.send((JSON.stringify({word}))
  
          //To post correct? socket.on("Enter", () => {isWordValid}('Player has won. The word was + ${`revealWord`}'))
          //check valid
          if (isWordValid(word)) {
            revealWord(word);
            state.currentRow++;
            state.currentCol = 0;
                    // emit("word-guess", word)
                } else {
                    alert('You have failed me anakin.');
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }

        updateGrid();

    };

}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
    return dictionary.includes(word);

}

function revealWord(guess) {
    const row = state.currentRow;
    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        if (letter === state.secret[i]) {
            box.classList.add('right');
        } else if (state.secret.includes(letter)) {
            box.classList.add('wrong');
        } else {
            box.classList.add('empty');
        }

    }

    const isWinner = state.secret === guess;
    const isNerdleOver = state.currentRow === 5;

    if (isWinner) {
        alert('Goood. Give in to your Hatred');
    } else if (isNerdleOver) {
        alert(`ObiWan, you are my only hope. The word was ${state.secret}.`);
    }
}
function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

function removeLetter() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}




//get by ID and call
function startup() {
    const nerdle = document.getElementById('nerdle');
    drawGrid(nerdle);

    registerKeyboardEvents();

    console.log(state.secret);
}
/* test grid

    state.grid = Array(6)
        .fill()
        .map(() => Array(5).fill('A'));
    updateGrid();
*/

startup()