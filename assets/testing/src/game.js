let canvas; 
let canvasWidth = 800; 
let canvasHeight = 600; 
const RIGHT = 1; 
const LEFT = -1; 


window.onload = () => {
    setupCanvas(); 
}

function setupCanvas() {
    canvas = document.getElementById("canvas"); 
    context = canvas.getContext("2d");
    context.fillStyle = "black";
    canvas.width = canvasWidth; 
    canvas.height = canvasHeight; 
    context.fillRect(0, 0, canvas.width, 600); 
}

function convertAngleToRadians(angle) {
    return angle * (Math.PI / 180);
}

