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
  drawGameCanvas(); 

  //create a new ship
  ship = new Ship();

  //create asteroids and push into asteroids array
  createAsteroids(); 

  //setup keyboard input
  setupKeyboardInput();

  //render everything to the screen
  render();
}

function setupKeyboardInput() {
  //holding down any key sets the value for that particular key to true
  document.body.addEventListener("keydown", (evt) => {
    keysArray[evt.keyCode] = true;
  });

  //releasing the key sets the value for that key to false
  document.body.addEventListener("keyup", (evt) => {
    keysArray[evt.keyCode] = false;
    if(evt.keyCode === KEY_SHOOT) {
      bulletsArray.push(new Bullet()); 
    }
  });
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


