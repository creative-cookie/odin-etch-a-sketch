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
    if(!e.currentTarget.style.backgroundColor){ 
        //random color if square hasn't had color added yet
        e.currentTarget.style.backgroundColor = randomColor();
        e.currentTarget.dataset.originalColor = e.currentTarget.style.backgroundColor;
    } else { 
        //darken current color if color has been added
        e.currentTarget.style.backgroundColor = darkenColor(e.currentTarget.style.backgroundColor, e.currentTarget.dataset.originalColor);
    }
}

function randomColor(){
    //setting min and max above 0 and below 255 to avoid completely black/white colors
    let max = 250;
    let min = 10;

    let r = Math.floor(Math.random() * (max - min) + min);
    let g = Math.floor(Math.random() * (max - min) + min);
    let b = Math.floor(Math.random() * (max - min) + min);

    return `rgb(${r},${g},${b})`;
}

function darkenColor(currentColor, originalColor){
        console.log(currentColor, originalColor);

        //use regex to grab rgb values and decrease by 10% using original color values stored in data-originalColor
        //original color values are being used instead of decreased colors to ensure it takes 10 steps to turn to black
        let r = Number(currentColor.match(/\((\d{1,3})\,/)[1]) - Math.ceil(Number(originalColor.match(/\((\d{1,3})\,/)[1] * 0.1));
        let g = Number(currentColor.match(/\,\s(\d{1,3}),/)[1]) - Math.ceil(Number(originalColor.match(/\,\s(\d{1,3}),/)[1] * 0.1));
        let b = Number(currentColor.match(/\,\s(\d{1,3})\)/)[1]) - Math.ceil(Number(originalColor.match(/\,\s(\d{1,3})\)/)[1] * 0.1));
        let colors = [r, g, b];

        //prevent negative rgb values
        for(let i = 0; i < colors.length; i++){
            if(colors[i] < 0){
                colors[i] = 0;
            }
        }

        return `rgb(${colors[0]},${colors[1]},${colors[2]})`;
}

function clearGrid(e){
    e.currentTarget.blur(); // remove btn focus state after click

    const boxes = document.getElementsByClassName("box");
    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.backgroundColor = "";
    }
}

generateGrid(gridSize);