/*------------------------------------*\
  #GAME CONSTANTS
\*------------------------------------*/
//General Game Config
const CANVAS_WIDTH = 800; //canvas.width
const CANVAS_HEIGHT = 600; //canvas.height
const FPS = 60; //for setting a frames per second constant. Used for ship invincibility timer
const TEXT_FADE_TIME = 2.5 //for settting the fade time of _onScreenText to 2.5 seconds duration
const ON = 1; //for setting soundfx to be on
const OFF = 0; //for setting soundfx to be off

//Keyboard Config
const KEY_LEFT_ARROW = 37; //for keyboard input left arrow key
const KEY_UP_ARROW = 38; //for keyboard input up arrow key
const KEY_RIGHT_ARROW = 39; //for keyboard input right arrow key
const KEY_SHOOT = 32; //for keyboard input spacebar

//Ship Config
const RIGHT = 1; //for ship rotation to the right in ship.rotation(direction)
const LEFT = -1; //for ship rotation to the left in ship.rotation(direction)
const SHIP_INVINCIBILITY_TIMEOUT = FPS * 3; //for setting a 3 second time-out for ship invincibility
const SHIP_SIZE = 16; //for setting the size of the ship
const SHIP_COLLISION_RADIUS = 14; //for setting the collsion radius of the ship

//Asteroid Config
const LARGE_ASTEROID_RADIUS = 80 //for setting the radius of a large asteroid
const MEDIUM_ASTEROID_RADIUS = 45 //for setting the radius of a medium sized asteroid
const SMALL_ASTEROID_RADIUS = 25 //for setting the radius of a small sized asteroid
const LARGE_ASTEROID_COLLISION_RADIUS = 76; //for setting the size of collision radius of large asteroid
const MEDIUM_ASTEROID_COLLISION_RADIUS = 40; //for setting the size of collision radius of medium asteroid
const SMALL_ASTEROID_COLLISION_RADIUS = 23; //for setting the size of collision radius of small asteroid
const MEDIUM_ASTEROID_SPEED = 1; //for setting the speed of a medium sized asteroid
const SMALL_ASTEROID_SPEED = 2; //for setting the speed of a small asteroid
const LARGE_ASTEROID_EXPLOSION_FACTOR = 0; //for setting a large asteroid explosion size
const MEDIUM_ASTEROID_EXPLOSION_FACTOR = 1.0; //for setting a medium asteroid explosion size
const SMALL_ASTEROID_EXPLOSION_FACTOR = 2.0; //for setting a small asteroid explosion size 
const ASTEROID_OFFSET = 5; //for off-setting asteroid from x and y coordinates when split into 2
const ASTEROID_VERTICES = 16; //for setting the average number of vertices on each asteroid
const ASTEROID_IRREGUALITY = 0.2 //for setting the irregularity of asteroid shape, where 0.0 is normal and 1.0 is very irregular
const SCORE_LARGE_ASTEROID = 20 //for setting score of hitting large asteroid
const SCORE_MEDIUM_ASTEROID = 50 //for setting score of hitting medium asteroid
const SCORE_SMALL_ASTEROID = 100 //for setting score of hitting small asteroid
const LARGE_ASTEROID_SIZE = 3; //for setting the sizing 'tag' of largest asteroid
const MEDIUM_ASTEROID_SIZE = 2; //for setting the sizing 'tag' of medium asteroid
const SMALL_ASTEROID_SIZE = 1; //for setting the sizing 'tag' of smallest asteroid

//Local Storage
const LOCAL_STORAGE_HIGHSCORE = "highScore"; //for setting local storage key of highscore
const LOCAL_STORAGE_SOUNDFX = "soundfx"; //for setting the local storage key of soundfx on/off

//DOM elements
const SCORE_HTML = document.querySelector(".score-value"); //for setting the score in html
const LIVES_HTML = document.querySelector(".lives"); //for setting the lives value in html
const HIGH_SCORE_HTML = document.querySelector(".high-score"); //for setting the high-score value in html
const LEFT_BUTTON = document.querySelector(".left-button"); //for getting the left button on gamepad controller
const RIGHT_BUTTON = document.querySelector(".right-button"); //for getting the right button on gamepad controller
const FIRE_BUTTON = document.querySelector(".fire-button"); //for getting the fire button on gamepad controller
const THRUST_BUTTON = document.querySelector(".up-button"); //for getting the thrust button on gamepad controller

//Color Array for small asteroids
const SMALL_ASTEROID_COLOR_ARRAY = [
  "rgb(0, 178, 163)",
  "rgb(0, 134, 163)",
  "rgb(0, 156, 134)",
  "rgb(10, 162, 147)",
  "rgb(0, 162, 147)",
  "rgb(0, 192, 163)",
  "rgb(0, 193, 123)",
  "rgb(0, 193, 90)"
];

/*------------------------------------*\
  #SOUND CONSTANTS USING HOWLER LIBRARY
\*------------------------------------*/
const FIRE_SOUND = new Howl({
  src: ["assets/audio/fire.webm", "assets/audio/fire.mp3"]
});
const THRUST_SOUND = new Howl({
  src: ["assets/audio/thrust.webm", "assets/audio/thrust.mp3"],
  volume: 0.3
});
const BANG_SMALL_ASTEROID_SOUND = new Howl({
  src: ["assets/audio/bangSmall.webm", "assets/audio/bangSmall.mp3"]
});
const BANG_MEDIUM_ASTEROID_SOUND = new Howl({
  src: ["assets/audio/bangMedium.webm", "assets/audio/bangMedium.mp3"]
});
const BANG_LARGE_ASTEROID_SOUND = new Howl({
  src: ["assets/audio/bangLarge.webm", "assets/audio/bangLarge.mp3"]
}); 

/*------------------------------------*\
#GAME VARIABLES
\*------------------------------------*/
let _lives = 3; //for setting the number of ship-lives
let _level = 1 //for setting the game level
let _highScore = 0; //for setting the high score
let _numberOfAsteroids = 1; //for setting the number of asteroids that appear on screen
let _onScreenText; //for displaying text related to 'Level No' and 'Game Over'
let _textAlpha; //for setting the alpha value of _onScreenText, where 1.0 is opaque, 0.0 is transparent

/*------------------------------------*\
  #GAME HELPER METHODS
\*------------------------------------*/
//for setting up the game canvas
function setupCanvas() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
}

//for converting degrees to radians
function convertAngleToRadians(angle) {
  return angle * (Math.PI / 180);
}

//for listening to keyboard input
function setupKeyboardInput() {
  //holding down any key sets the value for that particular key to true
  document.body.addEventListener("keydown", handleKeyDown); 

  //releasing the key sets the value for that particular key to false
  document.body.addEventListener("keyup", handleKeyUp); 
}

function handleKeyDown(e){
  if(ship.visible) {
    keysArray[e.keyCode] = true;
  }
}

function handleKeyUp(e){
  keysArray[e.keyCode] = false;
  if(ship.visible) {
    if (e.keyCode === KEY_SHOOT){   
        if(soundfxOn == ON) {
         FIRE_SOUND.play(); 
        }
      bulletsArray.push(new Bullet(ship.angle));
    }
  }
}

//for checking if ship is moving forward, left, or right
function checkKeyboardInput() {
  ship.movingForward = keysArray[KEY_UP_ARROW];
  if(keysArray[KEY_UP_ARROW]) {
     if(soundfxOn == ON) {
    THRUST_SOUND.play(); 
    }
  }
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

//for checking a collision between ship and asteroid
function checkCollisionShipAsteroid() {
  if(ship.visible) {
    if(ship.invincibility < -SHIP_INVINCIBILITY_TIMEOUT) {
      if (asteroidsArray.length !== 0) {
        for (let i=0; i<asteroidsArray.length; i++) {
          if (collisionDetection(ship.x, ship.y, ship.collisionRadius,
            asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].collisionRadius)) {
            //play sound
              if(soundfxOn == ON) {
                BANG_LARGE_ASTEROID_SOUND.play();
            }
            //draw the ship explosion
            drawShipExplosion();
            //reduce number of lives
            _lives--; 
            //set the lives in html
            if(_lives >= 0) {
              LIVES_HTML.textContent = _lives; 
              bulletsArray = [];
              ship.x = CANVAS_WIDTH/2;
              ship.y = CANVAS_HEIGHT/2;
              ship.angle = 90; 
              ship.velX = 0;
              ship.velY = 0;
              ship.invincibility = 0; 
            }
            //set the ship to invisible if ship-lives are zero
            if(_lives === 0) {
              ship.visible = false; 
              _onScreenText = "GAME OVER";
              _textAlpha = 1.0; 
            }
          }
        }
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
            //play sound
            if(soundfxOn == ON) {
             BANG_LARGE_ASTEROID_SOUND.play();
            }
            //show explosion
            drawAsteroidExplosion(i, LARGE_ASTEROID_EXPLOSION_FACTOR); 
            //create 2 new medium sized asteroids
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x - ASTEROID_OFFSET,
              asteroidsArray[i].y - ASTEROID_OFFSET,
              asteroidsArray[i].speed,
              MEDIUM_ASTEROID_RADIUS, 
              MEDIUM_ASTEROID_SIZE,
              MEDIUM_ASTEROID_COLLISION_RADIUS,
              asteroidsArray[i].radiusOffsetArray
              )); 
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x + ASTEROID_OFFSET,
              asteroidsArray[i].y + ASTEROID_OFFSET,
              asteroidsArray[i].speed,
              MEDIUM_ASTEROID_RADIUS, 
              MEDIUM_ASTEROID_SIZE,
              MEDIUM_ASTEROID_COLLISION_RADIUS,
              asteroidsArray[i].radiusOffsetArray
              )); 
              //update the score
              score += SCORE_LARGE_ASTEROID;
              //else if asteroid is a medium asteroid, break it up into x2 small asteroids, offset to the right and left
            } else if (asteroidsArray[i].size === MEDIUM_ASTEROID_SIZE) {
              //play sound
              if(soundfxOn == ON) {
               BANG_MEDIUM_ASTEROID_SOUND.play();
              }
              //show explosion
              drawAsteroidExplosion(i, MEDIUM_ASTEROID_EXPLOSION_FACTOR); 
              //create 2 new small sized asteroids
              asteroidsArray.push(new Asteroid(asteroidsArray[i].x - ASTEROID_OFFSET,
                asteroidsArray[i].y - ASTEROID_OFFSET,
                asteroidsArray[i].speed,
                SMALL_ASTEROID_RADIUS, 
                SMALL_ASTEROID_SIZE,
                SMALL_ASTEROID_COLLISION_RADIUS,
                asteroidsArray[i].radiusOffsetArray
                )); 
                asteroidsArray.push(new Asteroid(asteroidsArray[i].x + ASTEROID_OFFSET,
                  asteroidsArray[i].y + ASTEROID_OFFSET,
                  asteroidsArray[i].speed,
                  SMALL_ASTEROID_RADIUS, 
                  SMALL_ASTEROID_SIZE,
                  SMALL_ASTEROID_COLLISION_RADIUS, 
                  asteroidsArray[i].radiusOffsetArray
                  )); 
                  //update the score
                  score += SCORE_MEDIUM_ASTEROID; 
                } else {
                 //play sound
                 if(soundfxOn == ON) {
                  BANG_SMALL_ASTEROID_SOUND.play();
                 }
                 //show the explosion
                 drawAsteroidExplosion(i, SMALL_ASTEROID_EXPLOSION_FACTOR);
                 //update the score
                 score += SCORE_SMALL_ASTEROID; 
                }
          //set html score value
          SCORE_HTML.textContent = numberWithCommas(score);
          //remote the bullet and the asteroid
          asteroidsArray.splice(i, 1);
          bulletsArray.splice(j, 1);
          break; 
        }
      }
    }
  }
}

//for creating colorful outline of asteroids 
function colorfulAsteroidsStroke() {
  context.strokeStyle = "rgb(" + Math.floor(Math.random() *204) + " ," + 
  Math.floor(Math.random() * 255) + " ," + 
  Math.floor(Math.random() * 229) + ")";
}

//for creating the outline of ship when invincible
function invincibleShipStroke() {
  context.strokeStyle = "rgb(" + Math.floor(Math.random() * (255 - 200) + 200) + " ," + 
  Math.floor(Math.random() * 0) + " ," + 
  Math.floor(Math.random() * 0) + ")";
}

//for creating fill of invincible ship
function invincibleShipThrustFill() {
  context.fillStyle = "rgb(" + Math.floor(Math.random() * (255 - 100) + 100) + " ," + 
  Math.floor(Math.random() * (255 - 100) + 100) + " ," + 
  Math.floor(Math.random() * (255 - 100) + 100) + ")";
}

//for creating the fill of ship thrust
function shipThrustFill() {
  context.fillStyle = "rgb(" + Math.floor(Math.random() * (255 - 100) + 100) + " ," + 
  Math.floor(Math.random() * 0) + " ," + 
  Math.floor(Math.random() * 0) + ")";
}

//for creating the fill of ship thrust
function shipThrustOutline() {
  context.strokeStyle = "rgb(" + 255 + " ," + 
  Math.floor(Math.random() * (255 - 50) + 50) + " ," + 
  Math.floor(Math.random() * (100 - 50) + 50) + ")";
}

//for rendering twinkling star effect to the game canvas
function renderStars() {
  context.fillStyle = "white";
  for(let i=1; i<=7; i++) {
    for(let j=1; j<=7; j++) {
      context.fillRect(100*(i-(Math.floor(Math.random() * (3)))), 100*(j+(Math.floor(Math.random()*3))), 1, 1);
    }
  }
}

//for creating commas in score output
//https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//for checking if its game over
function checkIfGameOver() {
  if(_lives === 0){
    ship.visible = false;
  }  
}

//for getting local store of high score
function getLocalStorage() {
  if(localStorage.getItem(LOCAL_STORAGE_HIGHSCORE) == null) {
    _highScore = 0; 
  } else {
    _highScore = localStorage.getItem(LOCAL_STORAGE_HIGHSCORE);
  }
}

//for updating the high score
function updateHighScore() {
  _highScore = Math.max(score, _highScore); 
  localStorage.setItem(LOCAL_STORAGE_HIGHSCORE, _highScore); 
  HIGH_SCORE_HTML.textContent = numberWithCommas(_highScore.toString()); 
}

//for creating the touchscreen gamepad controller event listeners, and performing relevant actions
function setupGamePadController() {
    LEFT_BUTTON.addEventListener("touchstart", ()=> {
    keysArray[KEY_LEFT_ARROW] = true;
  })
    LEFT_BUTTON.addEventListener("touchend", ()=> {
    keysArray[KEY_LEFT_ARROW] = false;
  })
    RIGHT_BUTTON.addEventListener("touchstart", ()=> {
    keysArray[KEY_RIGHT_ARROW] = true;
  })  
    RIGHT_BUTTON.addEventListener("touchend", ()=> {
    keysArray[KEY_RIGHT_ARROW] = false;
  })
    FIRE_BUTTON.addEventListener("touchstart", ()=> {
    if(soundfxOn == ON) {
     FIRE_SOUND.play(); 
    }
    bulletsArray.push(new Bullet(ship.angle));
  })
    THRUST_BUTTON.addEventListener("touchstart", ()=> {
    keysArray[KEY_UP_ARROW] = true;
  })
    THRUST_BUTTON.addEventListener("touchend", ()=> {
    keysArray[KEY_UP_ARROW] = false;
  })
}

//for determining if soundfx are on/off
function getLocalStorageSoundfx() {
  if(localStorage.getItem(LOCAL_STORAGE_SOUNDFX) == OFF) {
      soundfxOn = OFF; 
  } else {
      soundfxOn = ON; 
  }
}

function drawShipExplosion() {
  context.fillStyle = "darkred";
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 3.4, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "red";
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 2.8, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "orange";
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 2.2, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "yellow";
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 1.6, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "white";
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 1.0, 0, Math.PI * 2, false);
  context.fill();
}

function drawAsteroidExplosion(i, explosionFactor) {
  context.fillStyle = "darkred";
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].radius * (0.68+explosionFactor), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "red";
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].radius * (0.56+explosionFactor), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "orange";
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].radius * (0.44+explosionFactor), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "yellow";
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].radius * (0.32+explosionFactor), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = "white";
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].radius * (0.2+explosionFactor), 0, Math.PI * 2, false);
  context.fill();
}

function renderOnScreenText() {
  if (_textAlpha >= 0) {
    context.fillStyle = "rgba(255, 255, 255, " + _textAlpha + ")";
    context.font = "4rem 'Press Start 2P'";
    context.textAlign = "center";
    context.fillText(_onScreenText, CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.7);
    _textAlpha -= 1.0 / TEXT_FADE_TIME / FPS;
  } else if (!ship.visible) {
    createNewGame(); 
  }
}

function resetShipAsteroidBullet() {
  asteroidsArray = [];
  bulletsArray = [];
  _onScreenText = "LEVEL " + _level;
  _textAlpha = 1.0;
  ship.x = CANVAS_WIDTH / 2;
  ship.y = CANVAS_HEIGHT / 2;
  ship.velX = 0;
  ship.velY = 0;
  ship.visible = true; 
  ship.invincibility = -SHIP_INVINCIBILITY_TIMEOUT;
}

function setupAsteroids() {
  //set the speed of the asteroid based on the level number
  let speedAsteroid = _level * 0.1 + 1;
  //ensures the asteroid is not positioned within collision radius of the ship at the start of game
  for (let i = 0; i < _numberOfAsteroids + _level; i++) {
    do {
      x = Math.floor(Math.random() * CANVAS_WIDTH);
      y = Math.floor(Math.random() * CANVAS_HEIGHT);
    } while (collisionDetection(x,y,LARGE_ASTEROID_SIZE,ship.x,ship.y,ship.collisionRadius * 20));
    asteroidsArray.push(new Asteroid(x, y, speedAsteroid));
  }
  //in order to create irregular polygon shapes, we assign values to the asteroids radiusOffsetArray. 
  //The radius of the asteroid is offset relative to the ASTEROID_IRREGUALITY constant.
  for (let i = 0; i < asteroidsArray.length; i++) {
    for (let j = 0; j < asteroidsArray[i].vertices; j++) {
      asteroidsArray[i].radiusOffsetArray.push(
        Math.random() * ASTEROID_IRREGUALITY * 2 + 1 - ASTEROID_IRREGUALITY
      );
    }
  }
  _level++; 
}

function createNewGame() {
  _level = 1; 
  score = 0; 
  _lives = 3; 
  LIVES_HTML.textContent = _lives;
  SCORE_HTML.textContent = numberWithCommas(score);
  resetShipAsteroidBullet(); 
  setupAsteroids(); 
}

//for creating a new level
function createNewLevel() {
  if(asteroidsArray.length === 0) {
    resetShipAsteroidBullet(); 
    setupAsteroids(); 
  }
}