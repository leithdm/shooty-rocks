/*------------------------------------*\
#GAME VARIABLES
\*------------------------------------*/
let _lives = 3; //for setting the number of ship-lives
let _level = 1; //for setting the game level
let _highScore = 0; //for setting the high score
let _numberOfAsteroids = 3; //for setting the number of asteroids that initially appear on screen
let _onScreenText; //for displaying text related to 'Level No' and 'Game Over'
let _textAlpha; //for setting the alpha value of _onScreenText, where 1.0 is opaque, 0.0 is transparent
let _soundfxOn; //for setting the in-game soundfx
let _music; //for setting in-game music

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

//for checking if its game over
function checkIfGameOver() {
  if(_lives === 0){
    ship.visible = false;
  }
}

//for resetting a ship, asteroid, and bullet
function resetShipAsteroidBullet() {
  asteroidsArray = [];
  bulletsArray = [];
  _onScreenText = "LEVEL " + _level;
  LEVEL_HTML.textContent = _level;
  _textAlpha = 1.0;
  ship.x = CANVAS_WIDTH / 2;
  ship.y = CANVAS_HEIGHT / 2;
  ship.velX = 0;
  ship.velY = 0;
  ship.visible = true;
  ship.invincibility = -SHIP_INVINCIBILITY_TIMEOUT;
}

//for setting up an asteroid belt
function setupAsteroids() {
  //set the speed of the asteroid based on the level number
  let speedAsteroid = _level * 0.2 + 1;
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

//for creating a new game
function createNewGame() {
  if(!GAME_MUSIC.playing() && _music == ON) {
    GAME_MUSIC.play();
    }
  GAME_OVER_PROMPT.style.display = "none";
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
    if(!GAME_MUSIC.playing() && _music == ON) {
      GAME_MUSIC.play();
      }
    resetShipAsteroidBullet();
    setupAsteroids();
  }
}

//for drawing ship explosion
function drawShipExplosion() {
  context.fillStyle = DARKRED_COLOR;
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 3.4, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = RED_COLOR;
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 2.8, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = ORANGE_COLOR;
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 2.2, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = BULLET_COLOR;
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 1.6, 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = WHITE_COLOR;
  context.beginPath();
  context.arc(ship.x, ship.y, ship.radius * 1.0, 0, Math.PI * 2, false);
  context.fill();
}

//for drawing an asteroid explosion, with an explosion factor based on size of asteroid
function drawAsteroidExplosion(i, explosionFactor) {
  context.fillStyle = DARKRED_COLOR;
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, (asteroidsArray[i].radius * (0.68+explosionFactor)), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = RED_COLOR;
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, (asteroidsArray[i].radius * (0.56+explosionFactor)), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = ORANGE_COLOR;
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, (asteroidsArray[i].radius * (0.44+explosionFactor)), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = BULLET_COLOR;
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, (asteroidsArray[i].radius * (0.32+explosionFactor)), 0, Math.PI * 2, false);
  context.fill();
  context.fillStyle = WHITE_COLOR;
  context.beginPath();
  context.arc(asteroidsArray[i].x, asteroidsArray[i].y, (asteroidsArray[i].radius * (0.2+explosionFactor)), 0, Math.PI * 2, false);
  context.fill();
}

//for rendering on-screen text related to Level and Game Over
function renderOnScreenText() {
  if (_textAlpha >= 0) {
    context.fillStyle = "rgba(255, 255, 255, " + _textAlpha + ")";
    context.font = "60px 'Press Start 2P'";
    context.textAlign = "center";
    context.fillText(_onScreenText, CANVAS_WIDTH / 2, CANVAS_HEIGHT * 0.7);
    _textAlpha -= 1.0 / TEXT_FADE_TIME / FPS;
  } else if (!ship.visible) {
    if(_music == ON) {
    GAME_MUSIC.stop();
    }
    GAME_OVER_PROMPT.style.display = "inline-block";
    GAME_OVER_SCORE.textContent = numberWithCommas(score);
    LIVES_HTML.classList.remove("lives-blinking");
  }
}

//for creating colorful invincible ship stroke
function invincibleShipStroke() {
  context.strokeStyle = "rgb(" +
  Math.floor(Math.random() *204) + " ," +
  Math.floor(Math.random() * 255) + " ," +
  Math.floor(Math.random() * 229) + ")";
}

//for creating the outline of ship thrust when invincible
function invincibleShipThrustStroke() {
  context.strokeStyle = "rgb(" +
  Math.floor(Math.random() * (255 - 200) + 200) + " ," +
  Math.floor(Math.random() * 0) + " ," +
  Math.floor(Math.random() * 0) + ")";
}

//for creating fill of invincible ship
function invincibleShipThrustFill() {
  context.fillStyle = "rgb(" +
  Math.floor(Math.random() * (255 - 100) + 100) + " ," +
  Math.floor(Math.random() * (255 - 100) + 100) + " ," +
  Math.floor(Math.random() * (255 - 100) + 100) + ")";
}

//for creating the fill of ship thrust
function shipThrustFill() {
  context.fillStyle = "rgb(" +
  Math.floor(Math.random() * (255 - 100) + 100) + " ," +
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
  context.fillRect((Math.floor(Math.random() * CANVAS_WIDTH)), ((Math.floor(Math.random() * CANVAS_HEIGHT))), 1.8, 1.8);
}

//for creating commas in score output
//https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}