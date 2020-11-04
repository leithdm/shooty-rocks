const canvasWidth = 800;    //canvas.width
const canvasHeight = 600;   //canvas.height
const RIGHT = 1;    //for ship rotation to the right in ship.rotation(direction)
const LEFT = -1;    //for ship rotation to the left in ship.rotation(direction)
const KEY_LEFT_ARROW = 37;  //for keyboard input left arrow key
const KEY_UP_ARROW = 38;    //for keyboard input up arrow key
const KEY_RIGHT_ARROW = 39; //for keyboard input right arrow key
const KEY_SHOOT = 32; //for keyboard input spacebar

//utility function to convert degrees to radians
function convertAngleToRadians(angle) {
    return angle * (Math.PI / 180);
  }

//create a black game canvas
function drawGameCanvas() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}