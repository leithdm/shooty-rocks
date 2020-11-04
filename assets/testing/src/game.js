let canvas;
let ship;
let keys = [];
let bullets = []; 

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

  setupKeyboardInput();
  render();
}

function setupKeyboardInput() {
  //holding down any key sets the value for that particular key to true
  document.body.addEventListener("keydown", (evt) => {
    keys[evt.keyCode] = true;
  });

  //releasing the key sets the value for that key to false
  document.body.addEventListener("keyup", (evt) => {
    keys[evt.keyCode] = false;
    if(evt.keyCode === KEY_SHOOT) {
      bullets.push(new Bullet()); 
    }
  });
}

function render() {
  ship.movingForward = keys[KEY_UP_ARROW];

  if(keys[KEY_LEFT_ARROW]) {
    ship.rotate(LEFT);
  }
  if(keys[KEY_RIGHT_ARROW]) {
    ship.rotate(RIGHT);
  }

  //clear the canvas, then redraw the canvas in order to get ready for next frame
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawGameCanvas(); 

  //update the ships position, then draw the ship
  ship.updateShip(); 
  ship.drawShip();

  //draw bullets
  if(bullets.length !== 0) {
    for(let i=0; i<bullets.length; i++) {
      bullets[i].updateBullet();
      bullets[i].drawBullet(); 
    }
  }

  //automated frame per second game loop. More efficient than setInterval()
  requestAnimationFrame(render);
}

