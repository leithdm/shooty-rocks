/**************************************************/
/*game constants                                  */
/**************************************************/

const canvasWidth = 800; //canvas.width
const canvasHeight = 600; //canvas.height
const RIGHT = 1; //for ship rotation to the right in ship.rotation(direction)
const LEFT = -1; //for ship rotation to the left in ship.rotation(direction)
const KEY_LEFT_ARROW = 37; //for keyboard input left arrow key
const KEY_UP_ARROW = 38; //for keyboard input up arrow key
const KEY_RIGHT_ARROW = 39; //for keyboard input right arrow key
const KEY_SHOOT = 32; //for keyboard input spacebar
const NUMBER_OF_ASTEROIDS = 8; //for setting the number of asteroids that appear on screen


/**************************************************/
/*game 'helper' methods                           */
/**************************************************/

//for setting up the game canvas
function setupCanvas() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
}

//for converting degrees to radians
function convertAngleToRadians(angle) {
  return angle * (Math.PI / 180);
}

//for listening to keyboard input
function setupKeyboardInput() {
  //holding down any key sets the value for that particular key to true
  document.body.addEventListener("keydown", (evt) => {
    keysArray[evt.keyCode] = true;
  });

  //releasing the key sets the value for that particular key to false
  document.body.addEventListener("keyup", (evt) => {
    keysArray[evt.keyCode] = false;
    if (evt.keyCode === KEY_SHOOT) {
      bulletsArray.push(new Bullet());
    }
  });
}

//for checking if ship is moving forward, left, or right
function checkKeyboardInput() {
  ship.movingForward = keysArray[KEY_UP_ARROW];

  if (keysArray[KEY_LEFT_ARROW]) {
    ship.rotate(LEFT);
  }
  if (keysArray[KEY_RIGHT_ARROW]) {
    ship.rotate(RIGHT);
  }
}

//for creating a black game canvas
function renderGameCanvas() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

//for creating an array of asteroid objects
function createAsteroids() {
  for (let i = 0; i < NUMBER_OF_ASTEROIDS; i++) {
    asteroidsArray.push(new Asteroid());
  }
}

//for drawing bullets to the game canvas
function renderBullets() {
  if (bulletsArray.length !== 0) {
    for (let i = 0; i < bulletsArray.length; i++) {
      bulletsArray[i].updateBullet();
      bulletsArray[i].drawBullet();
    }
  }
}

//for rendering asteroids to the game canvas
function renderAsteroids() {
  for (let i = 0; i < asteroidsArray.length; i++) {
    asteroidsArray[i].updateAsteroid();
    asteroidsArray[i].drawAsteroid();
  }
}

//for circle collision-detection between an object 1 and an object 2
function collisionDetection(obj1x, obj1y, obj1CollisionRadius, obj2x, obj2y, obj2CollisionRadius) {
  let radiusCollisionSum;
  let xDiff;
  let yDiff;

  radiusCollisionSum = obj1CollisionRadius + obj2CollisionRadius;
  xDiff = obj1x - obj2x;
  yDiff = obj1y - obj2y;

  //determine if there is a collision
  if (radiusCollisionSum > Math.sqrt(xDiff * xDiff + yDiff * yDiff)) {
    return true;
  } else {
    return false;
  }
}
