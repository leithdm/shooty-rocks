let canvas;
let canvasWidth = 800;
let canvasHeight = 600;
let ship;
let keys = [];
const RIGHT = 1;
const LEFT = -1;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;

window.onload = () => {
  setupCanvas();
};

function setupCanvas() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  
  context.fillStyle = "black";
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  context.fillRect(0, 0, canvas.width, canvas.height);

  //create a new ship
  ship = new Ship();

  setupKeyboardInput();
  render();
}

function setupKeyboardInput() {
  //holding down any key sets the value for that particular key to true
  document.body.addEventListener("keydown", (evt) => {
    keys[evt.keyCode] = true;
    console.log(keys);
  });

  //releasing the key sets the value for that key to false
  document.body.addEventListener("keyup", (evt) => {
    keys[evt.keyCode] = false;
  });
}

function render() {
  ship.movingForward = keys[KEY_UP_ARROW];

  if (keys[KEY_LEFT_ARROW]) {
    ship.rotate(LEFT);
  }
  if (keys[KEY_RIGHT_ARROW]) {
    ship.rotate(RIGHT);
  }

  //clear the canvas, then redraw the canvas in order to get ready for next frame
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillRect(0, 0, canvas.width, canvas.height);

  //update the ships position, then draw the ship
  ship.updateShip(); 
  ship.drawShip();

  //automated frame per second game loop. More efficient than setInterval()
  requestAnimationFrame(render);
}

function convertAngleToRadians(angle) {
  return angle * (Math.PI / 180);
}
