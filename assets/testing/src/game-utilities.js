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
const LARGE_ASTEROID_SIZE = 3; //for setting the size of largest asteroid
const MEDIUM_ASTEROID_SIZE = 2; //for setting the size of medium asteroid
const SMALL_ASTEROID_SIZE = 1; //for setting the size of smallest asteroid
const MEDIUM_ASTEROID_RADIUS = 25 //for setting the radius of a medium sized asteroid
const MEDIUM_ASTEROID_COLLISION_RADIUS = 22; //for setting the size of collision radius of medium asteroid
const SMALL_ASTEROID_RADIUS = 15 //for setting the radius of a small sized asteroid
const SMALL_ASTEROID_COLLISION_RADIUS = 12; //for setting the size of collision radius of small asteroid
const ASTEROID_OFFSET = 5; //for off-setting asteroid from x and y coordinates when split into 2
const SCORE_LARGE_ASTEROID = 100 //for setting score of hitting large asteroid
const SCORE_MEDIUM_ASTEROID = 200 //for setting score of hitting medium asteroid
const SCORE_SMALL_ASTEROID = 300 //for setting score of hitting small asteroid

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
    for (let i=0; i<bulletsArray.length; i++) {
      bulletsArray[i].updateBullet();
      bulletsArray[i].drawBullet();
    }
  }
}

//for rendering asteroids to the game canvas
function renderAsteroids() {
  for (let i=0; i <asteroidsArray.length; i++) {
    asteroidsArray[i].updateAsteroid();
    asteroidsArray[i].drawAsteroid();
  }
}

//for circle collision-detection between object 1 and object 2
function collisionDetection(obj1x, obj1y, obj1CollisionRadius,
  obj2x, obj2y, obj2CollisionRadius) {
  let radiusCollisionSum;
  let xDiff;
  let yDiff;

  radiusCollisionSum = obj1CollisionRadius + obj2CollisionRadius;
  xDiff = obj1x - obj2x;
  yDiff = obj1y - obj2y;

  //determine if there is a collision
  if (radiusCollisionSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))) {
    return true;
  } else {
    return false;
  }
}

//for checking collision between ship and asteroid
function checkCollisionShipAsteroid() {
  if (asteroidsArray.length !== 0) {
    for (let i=0; i<asteroidsArray.length; i++) {
      if (collisionDetection(ship.x, ship.y, ship.collisionRadius,
        asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].collisionRadius)) {
        ship.x = canvasWidth/2;
        ship.y = canvasHeight/2;
        ship.angle = 90; 
        ship.velX = 0;
        ship.velY = 0;
      }
    }
  }
}

//for checking collison between a bullet and an asteroid
function checkCollisionBulletAsteroid() {
  if (asteroidsArray.length !== 0 && bulletsArray.length !== 0) {
    for (let i=0; i<asteroidsArray.length; i++) {
      for (let j=0; j<bulletsArray.length; j++) {
        if(collisionDetection(bulletsArray[j].x, bulletsArray[j].y, bulletsArray[j].collisionRadius,
          asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].collisionRadius)) {
          //if asteroid is a large asteroid, break it up into x2 medium asteroids, offset to the right and left
          if(asteroidsArray[i].size === LARGE_ASTEROID_SIZE) {
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x - ASTEROID_OFFSET,
              asteroidsArray[i].y - ASTEROID_OFFSET,
              MEDIUM_ASTEROID_RADIUS, 
              MEDIUM_ASTEROID_SIZE,
              MEDIUM_ASTEROID_COLLISION_RADIUS
              )); 
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x + ASTEROID_OFFSET,
              asteroidsArray[i].y + ASTEROID_OFFSET,
              MEDIUM_ASTEROID_RADIUS, 
              MEDIUM_ASTEROID_SIZE,
              MEDIUM_ASTEROID_COLLISION_RADIUS
              )); 
              
              //update the score
              score += SCORE_LARGE_ASTEROID; 

          //else if asteroid is a medium asteroid, break it up into x2 small asteroids, offset to the right and left
          } else if (asteroidsArray[i].size === MEDIUM_ASTEROID_SIZE) {
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x - ASTEROID_OFFSET,
              asteroidsArray[i].y - ASTEROID_OFFSET,
              SMALL_ASTEROID_RADIUS, 
              SMALL_ASTEROID_SIZE,
              SMALL_ASTEROID_COLLISION_RADIUS
              )); 
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x + ASTEROID_OFFSET,
              asteroidsArray[i].y + ASTEROID_OFFSET,
              SMALL_ASTEROID_RADIUS, 
              SMALL_ASTEROID_SIZE,
              SMALL_ASTEROID_COLLISION_RADIUS
              )); 

              //update the score
              score += SCORE_MEDIUM_ASTEROID; 
          } else {
            //update the score
            score += SCORE_SMALL_ASTEROID; 
          }


          //remote the bullet and the asteroid
          asteroidsArray.splice(i, 1);
          bulletsArray.splice(j, 1);
          break; 
        }
      }
    }
  }
}
