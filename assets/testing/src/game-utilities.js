/*------------------------------------*\
  #GAME CONSTANTS
\*------------------------------------*/
const canvasWidth = 800; //canvas.width
const canvasHeight = 600; //canvas.height
const RIGHT = 1; //for ship rotation to the right in ship.rotation(direction)
const LEFT = -1; //for ship rotation to the left in ship.rotation(direction)
const KEY_LEFT_ARROW = 37; //for keyboard input left arrow key
const KEY_UP_ARROW = 38; //for keyboard input up arrow key
const KEY_RIGHT_ARROW = 39; //for keyboard input right arrow key
const KEY_SHOOT = 32; //for keyboard input spacebar
const LARGE_ASTEROID_SIZE = 3; //for setting the size of largest asteroid
const MEDIUM_ASTEROID_SIZE = 2; //for setting the size of medium asteroid
const SMALL_ASTEROID_SIZE = 1; //for setting the size of smallest asteroid
const MEDIUM_ASTEROID_RADIUS = 25 //for setting the radius of a medium sized asteroid
const MEDIUM_ASTEROID_COLLISION_RADIUS = 22; //for setting the size of collision radius of medium asteroid
const SMALL_ASTEROID_RADIUS = 15 //for setting the radius of a small sized asteroid
const SMALL_ASTEROID_COLLISION_RADIUS = 12; //for setting the size of collision radius of small asteroid
const ASTEROID_OFFSET = 5; //for off-setting asteroid from x and y coordinates when split into 2
const SCORE_LARGE_ASTEROID = 20 //for setting score of hitting large asteroid
const SCORE_MEDIUM_ASTEROID = 50 //for setting score of hitting medium asteroid
const SCORE_SMALL_ASTEROID = 100 //for setting score of hitting small asteroid
const ASTEROID_MAX_VERTICE_ANGLE = 10 //for setting the max vertice angle of an asteroid
const ASTEROID_MIN_VERTICE_ANGLE =  9 //for setting the min vertice angle of an asteroid
const MEDIUM_ASTEROID_SPEED = 1; //for setting the speed of a medium sized asteroid
const SMALL_ASTEROID_SPEED = 2; //for setting the speed of a small asteroid
const LOCAL_STORAGE_KEY = "highScore"; //for setting local storage key of highscore
const LOCAL_STORAGE_SOUNDFX = "soundfx"; //for setting the local storage key of soundfx on/off
const SCORE_HTML = document.querySelector(".score-value"); //for setting the score in html
const LIVES_HTML = document.querySelector(".lives"); //for setting the lives value in html
const HIGH_SCORE_HTML = document.querySelector(".high-score"); //for setting the high-score value in html
const LEFT_BUTTON = document.querySelector(".left-button"); //for getting the left button on gamepad controller
const RIGHT_BUTTON = document.querySelector(".right-button"); //for getting the right button on gamepad controller
const FIRE_BUTTON = document.querySelector(".fire-button"); //for getting the fire button on gamepad controller
const THRUST_BUTTON = document.querySelector(".up-button"); //for getting the thrust button on gamepad controller
const ON = 1; //for setting soundfx to be on
const OFF = 0; //for setting soundfx to be off
const ASTEROID_VERTICES = 16; //average number of vertices on each asteroid
const ASTEROID_IRREGUALITY = 0.1 //where 0 is normal and 1.0 is very irregular

/*------------------------------------*\
#GAME VARIABLES
\*------------------------------------*/
let lives = 3; //for setting the number of ship-lives
let highScore = 0; //for setting the high score
let NUMBER_OF_ASTEROIDS = 4; //for setting the number of asteroids that appear on screen


/*------------------------------------*\
  #SOUND CONSTANTS USING HOWLER LIBRARY
\*------------------------------------*/
const fireSound = new Howl({
  src: ["assets/audio/fire.webm", "assets/audio/fire.ogg", "assets/audio/fire.mp3"]
});
const thrustSound = new Howl({
  src: ["assets/audio/thrust.webm", "assets/audio/thrust.ogg", "assets/audio/thrust.mp3"]
});
const bangSmallSound = new Howl({
  src: ["assets/audio/bangSmall.webm", "assets/audio/bangSmall.ogg", "assets/audio/bangSmall.mp3"]
});
const bangMediumSound = new Howl({
  src: ["assets/audio/bangMedium.webm", "assets/audio/bangMedium.ogg", "assets/audio/bangMedium.mp3"]
});
const bangLargeSound = new Howl({
  src: ["assets/audio/bangLarge.webm", "assets/audio/bangLarge.ogg", "assets/audio/bangLarge.mp3"]
}); 


/*------------------------------------*\
  #GAME HELPER METHODS
\*------------------------------------*/
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
  document.body.addEventListener("keydown", handleKeyDown); 

  //releasing the key sets the value for that particular key to false
  document.body.addEventListener("keyup", handleKeyUp); 
}

function handleKeyDown(e){
  keysArray[e.keyCode] = true;
}

function handleKeyUp(e){
  keysArray[e.keyCode] = false;
  if (e.keyCode === KEY_SHOOT){   
      if(soundfxOn == ON) {
       fireSound.play(); 
      }
      bulletsArray.push(new Bullet(ship.angle));
  }
}

//for checking if ship is moving forward, left, or right
function checkKeyboardInput() {
  ship.movingForward = keysArray[KEY_UP_ARROW];
  if(keysArray[KEY_UP_ARROW]) {
     if(soundfxOn == ON) {
    thrustSound.play(); 
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

//for creating a new level
function createNewLevel() {
  if(asteroidsArray.length === 0) {
    ship.x = canvasWidth/2;
    ship.y = canvasHeight/2;
    ship.velX = 0;
    ship.velY = 0;
    NUMBER_OF_ASTEROIDS++;
    //ensures the asteroid is not positioned within collision radius of the ship at the start of game
    for (let i = 0; i < NUMBER_OF_ASTEROIDS; i++) {
      do { x = Math.floor(Math.random() * canvasWidth);
        y = Math.floor(Math.random() * canvasHeight);
      } while (collisionDetection(x,y,LARGE_ASTEROID_SIZE,ship.x,ship.y,ship.collisionRadius * 20));
      asteroidsArray.push(new Asteroid(x, y)); 
    }

    //in order to create irregular polygon shapes, we assign values to the asteroids radiusOffsetArray. 
    //The radius of the asteroid is offset relative to the ASTEROID_IRREGUALITY constant.
    for(let i=0; i<asteroidsArray.length; i++) {
      for(let j=0; j<asteroidsArray[i].vertices; j++) {
        asteroidsArray[i].radiusOffsetArray.push(Math.random() * ASTEROID_IRREGUALITY * 2 + 1 - ASTEROID_IRREGUALITY); 
      }
    } 
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
        //play sound
          if(soundfxOn == ON) {
         bangLargeSound.play();
        }
        //draw the ship explosion
        drawShipExplosion();
        //reduce number of lives
        lives--; 
        //set the lives in html
        if(lives >= 0) {
        LIVES_HTML.textContent = lives; 
        }
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
            //play sound
            if(soundfxOn == ON) {
             bangLargeSound.play();
            }
            //show explosion
            drawAsteroidExplosion(i, 0); 
            //create 2 new medium sized asteroids
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x - ASTEROID_OFFSET,
              asteroidsArray[i].y - ASTEROID_OFFSET,
              MEDIUM_ASTEROID_RADIUS, 
              MEDIUM_ASTEROID_SIZE,
              MEDIUM_ASTEROID_COLLISION_RADIUS,
              MEDIUM_ASTEROID_SPEED,
              asteroidsArray[i].radiusOffsetArray
              )); 
            asteroidsArray.push(new Asteroid(asteroidsArray[i].x + ASTEROID_OFFSET,
              asteroidsArray[i].y + ASTEROID_OFFSET,
              MEDIUM_ASTEROID_RADIUS, 
              MEDIUM_ASTEROID_SIZE,
              MEDIUM_ASTEROID_COLLISION_RADIUS,
              MEDIUM_ASTEROID_SPEED, 
              asteroidsArray[i].radiusOffsetArray
              )); 
              //update the score
              score += SCORE_LARGE_ASTEROID;
              //else if asteroid is a medium asteroid, break it up into x2 small asteroids, offset to the right and left
            } else if (asteroidsArray[i].size === MEDIUM_ASTEROID_SIZE) {
              //play sound
              if(soundfxOn == ON) {
               bangMediumSound.play();
              }
              //show explosion
              drawAsteroidExplosion(i, 1); 
              //create 2 new small sized asteroids
              asteroidsArray.push(new Asteroid(asteroidsArray[i].x - ASTEROID_OFFSET,
                asteroidsArray[i].y - ASTEROID_OFFSET,
                SMALL_ASTEROID_RADIUS, 
                SMALL_ASTEROID_SIZE,
                SMALL_ASTEROID_COLLISION_RADIUS,
                SMALL_ASTEROID_SPEED
                )); 
                asteroidsArray.push(new Asteroid(asteroidsArray[i].x + ASTEROID_OFFSET,
                  asteroidsArray[i].y + ASTEROID_OFFSET,
                  SMALL_ASTEROID_RADIUS, 
                  SMALL_ASTEROID_SIZE,
                  SMALL_ASTEROID_COLLISION_RADIUS, 
                  SMALL_ASTEROID_SPEED
                  )); 
                  //update the score
                  score += SCORE_MEDIUM_ASTEROID; 
                } else {
                 //play sound
                 if(soundfxOn == ON) {
                  bangSmallSound.play();
                 }
                 //show the explosion
                 drawAsteroidExplosion(i, 2);
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
  context.strokeStyle = "rgb(" + Math.floor(Math.random() *255) + " ," + 
  Math.floor(Math.random() * 255) + " ," + 
  Math.floor(Math.random() * 255) + ")";
}

//for creating a colorful fill of asteroids
function colorfulAsteroidsFill() {
  context.fillStyle = "rgb(" + Math.floor(Math.random() *255) + " ," + 
  Math.floor(Math.random() * 255) + " ," + 
  Math.floor(Math.random() * 255) + ")";
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
  if(lives <= 0){
    document.body.removeEventListener("keydown", handleKeyDown);
    document.body.removeEventListener("keyup", handleKeyUp);
    ship.visible = false;
    context.font = "2rem 'Press Start 2P'"
    context.fillStyle = "rgb(178, 34, 52)";
    context.fillText("GAME OVER", canvasWidth / 2 - 150, canvasHeight / 2);
    setInterval(()=> {
      window.location.href='index.html'
    }, 4000)
  }  
}

//for getting local store of high score
function getLocalStorage() {
  if(localStorage.getItem(LOCAL_STORAGE_KEY) == null) {
    highScore = 0; 
  } else {
    highScore = localStorage.getItem(LOCAL_STORAGE_KEY);
  }
}

//for updating the high score
function updateHighScore() {
  highScore = Math.max(score, highScore); 
  localStorage.setItem(LOCAL_STORAGE_KEY, highScore); 
  HIGH_SCORE_HTML.textContent = numberWithCommas(highScore.toString()); 
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
     fireSound.play(); 
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