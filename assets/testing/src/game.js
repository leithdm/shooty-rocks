let canvas;
let ship;
let keysArray = [];
let bulletsArray = []; 
let asteroidsArray = [];

window.onload = () => {
  setupCanvas();
};

function setupCanvas() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  //draw the game canvas
  drawGameCanvas(); 

  //instantiate a new ship
  ship = new Ship();

  //create asteroids, and push into asteroidsArray
  createAsteroids(); 

  //setup keyboard to listen for input
  setupKeyboardInput();

  //render everything to the screen
  render();
}

function render() {
  ship.movingForward = keysArray[KEY_UP_ARROW];

  if(keysArray[KEY_LEFT_ARROW]) {
    ship.rotate(LEFT);
  }
  if(keysArray[KEY_RIGHT_ARROW]) {
    ship.rotate(RIGHT);
  }

  //clear the canvas, then redraw the canvas in order to get ready for next frame
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawGameCanvas(); 

  //update the ships position
  ship.updateShip(); 

  //render the ship
  ship.drawShip();

  //render the bullets
  renderBullets(); 

  //render the asteroids
  renderAsteroids(); 

  //automated frame per second game loop. More efficient than setInterval()
  requestAnimationFrame(render);
}


