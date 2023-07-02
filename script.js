// Define variables
let gridSize = 16;

const gridContainer = document.getElementById("grid-container");
const clearGridBtn = document.getElementById("clear-grid-btn");

function square(num){
    return num * num;
}
function generateGrid(gridSize){
    for(let i = 0; i < square(gridSize); i++){
        const newBox = document.createElement("div");
        newBox.classList.add("box");
        newBox.style.height = (100 * (1/gridSize)) + '%';
        newBox.style.width = (100 * (1/gridSize)) + '%';
        newBox.addEventListener("mouseenter", changeColor);
        gridContainer.appendChild(newBox);
    }

    clearGridBtn.addEventListener("click", clearGrid);
}

function changeColor(e){
    e.currentTarget.style.backgroundColor = "#000";
}

function clearGrid(e){
    e.currentTarget.blur(); // remove btn focus state after click

    const boxes = document.getElementsByClassName("box");
    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.backgroundColor = "#fff";
    }
}

generateGrid(gridSize);