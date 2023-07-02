// Define variables
let gridSize = 16;

const gridContainer = document.getElementById("grid-container");
const clearGridBtn = document.getElementById("clear-grid-btn");
const generateGridBtn = document.getElementById("generate-grid-btn");
const gridSizeInput = document.getElementById("grid-size-input");

// Add Event Listeners
clearGridBtn.addEventListener("click", clearGrid);
generateGridBtn.addEventListener("click", updateGrid);
gridSizeInput.addEventListener("keyup", formValidation);

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
}

function updateGrid(e){
    e.preventDefault(); //stop form from submitting
    e.currentTarget.blur(); // remove btn focus state after click
    if (gridSizeInput.value >= 1 && gridSizeInput.value <= 100){
        removeGrid(); // remove old grid
        generateGrid(gridSizeInput.value); //generate new grid using user value
    }
}

function removeGrid(){
    let oldBox = gridContainer.lastElementChild;
    while(oldBox){
        oldBox.removeEventListener("mouseenter",changeColor);
        gridContainer.removeChild(oldBox);
        oldBox = gridContainer.lastElementChild;
    }
}

function formValidation(e){
    if(isNaN(gridSizeInput.value) || gridSizeInput.value > 100 || gridSizeInput.value < 1){
        gridSizeInput.classList.add("input-error");
    } else{
        gridSizeInput.classList.remove("input-error");
    }
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