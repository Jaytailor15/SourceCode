const gridSize = 4;
let grid = [];
let score = 0;

window.onload = function () {
    initGame();
    document.addEventListener('keydown', handleKeyInput);
};

function initGame() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    addRandomTile();
    addRandomTile();
    updateGrid();
}

function addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (grid[r][c] === 0) emptyCells.push({ r, c });
        }
    }
    if (emptyCells.length === 0) return;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function updateGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            if (grid[r][c] !== 0) {
                cell.textContent = grid[r][c];
                cell.setAttribute('data-value', grid[r][c]);
            }
            gridContainer.appendChild(cell);
        }
    }
    document.getElementById('score').textContent = score;
}

function handleKeyInput(event) {
    const moves = {
        'ArrowUp': moveUp,
        'ArrowDown': moveDown,
        'ArrowLeft': moveLeft,
        'ArrowRight': moveRight
    };

    const move = moves[event.key];
    if (move) {
        move();
        addRandomTile();
        updateGrid();
        if (checkGameOver()) handleGameOver();
    }
}

function moveUp() {
    for (let c = 0; c < gridSize; c++) {
        const col = grid.map(row => row[c]);
        const newCol = slideAndMerge(col);
        for (let r = 0; r < gridSize; r++) {
            grid[r][c] = newCol[r];
        }
    }
}

function moveDown() {
    for (let c = 0; c < gridSize; c++) {
        const col = grid.map(row => row[c]);
        const newCol = slideAndMerge(col.reverse()).reverse();
        for (let r = 0; r < gridSize; r++) {
            grid[r][c] = newCol[r];
        }
    }
}

function moveLeft() {
    for (let r = 0; r < gridSize; r++) {
        grid[r] = slideAndMerge(grid[r]);
    }
}

function moveRight() {
    for (let r = 0; r < gridSize; r++) {
        grid[r] = slideAndMerge(grid[r].reverse()).reverse();
    }
}

function slideAndMerge(array) {
    const newArr = array.filter(val => val !== 0);
    let scoreChange = 0;

    for (let i = 0; i < newArr.length - 1; i++) {
        if (newArr[i] === newArr[i + 1]) {
            newArr[i] *= 2;
            scoreChange += newArr[i];
            newArr[i + 1] = 0;
        }
    }

    const filteredArr = newArr.filter(val => val !== 0);
    score += scoreChange;

    return [...filteredArr, ...Array(gridSize - filteredArr.length).fill(0)];
}

function checkGameOver() {
    return grid.flat().every(val => val !== 0) && 
           !grid.some((row, r) => row.some((val, c) => 
               (c < gridSize - 1 && val === row[c + 1]) || 
               (r < gridSize - 1 && val === grid[r + 1][c])
           ));
}

function handleGameOver() {
    document.getElementById('game-over-modal').style.display = 'block';
    document.getElementById('final-score').textContent = score;
}

function restartGame() {
    document.getElementById('game-over-modal').style.display = 'none';
    score = 0;
    initGame();
}

document.getElementById('restart-btn').addEventListener('click', restartGame);
