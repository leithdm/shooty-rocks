/*------------------------------------*\
  #GAME CONSTANTS
\*------------------------------------*/
//General Game Config
const CANVAS_WIDTH = 800; //canvas.width
const CANVAS_HEIGHT = 600; //canvas.height
const FPS = 60; //for setting a frames per second constant. Used for ship invincibility timer
const TEXT_FADE_TIME = 2.5; //for settting the fade time of _onScreenText to 2.5 seconds duration
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
const SHIP_SIZE = 12; //for setting the size of the ship
const SHIP_COLLISION_RADIUS = 10; //for setting the collsion radius of the ship

//Asteroid Config
const LARGE_ASTEROID_RADIUS = 80; //for setting the radius of a large asteroid
const MEDIUM_ASTEROID_RADIUS = 45; //for setting the radius of a medium sized asteroid
const SMALL_ASTEROID_RADIUS = 25; //for setting the radius of a small sized asteroid
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
const ASTEROID_IRREGUALITY = 0.2; //for setting irregularity of asteroid shape; 0.0 is normal, 1.0 irregular
const SCORE_LARGE_ASTEROID = 20; //for setting score of hitting large asteroid
const SCORE_MEDIUM_ASTEROID = 50; //for setting score of hitting medium asteroid
const SCORE_SMALL_ASTEROID = 100; //for setting score of hitting small asteroid
const LARGE_ASTEROID_SIZE = 3; //for setting the sizing 'tag' of largest asteroid
const MEDIUM_ASTEROID_SIZE = 2; //for setting the sizing 'tag' of medium asteroid
const SMALL_ASTEROID_SIZE = 1; //for setting the sizing 'tag' of smallest asteroid

//Bullet Config
const BULLET_WIDTH = 4; //for setting the width of the bullet
const BULLET_HEIGHT = 4; //for setting the height of the bullet
const BULLET_COLLISION_RADIUS = 3; //for setting collision radius of the bullet
const BULLET_SPEED = 10; //for setting the speed of the bullet

//Local Storage
const LOCAL_STORAGE_HIGHSCORE = "highScore"; //for setting local storage key of highscore
const LOCAL_STORAGE_SOUNDFX = "soundfx"; //for setting the local storage key of soundfx on/off
const LOCAL_STORAGE_MUSIC = "music"; //for setting the local storage key of music on/off

//DOM elements
const SCORE_HTML = document.querySelector(".score-value"); //for setting the score in html
const LIVES_HTML = document.querySelector(".lives"); //for setting the lives value in html
const HIGH_SCORE_HTML = document.querySelector(".high-score"); //for setting the high-score value in html
const LEFT_BUTTON = document.querySelector(".left-button"); //for getting the left button on gamepad controller
const RIGHT_BUTTON = document.querySelector(".right-button"); //for getting the right button on gamepad controller
const FIRE_BUTTON = document.querySelector(".fire-button"); //for getting the fire button on gamepad controller
const THRUST_BUTTON = document.querySelector(".up-button"); //for getting the thrust button on gamepad controller
const SOUNDFX_TOGGLE = document.querySelector(".soundfx-button"); //for setting the in-game soundfx to on/off
const MUSIC_TOGGLE = document.querySelector(".music-button"); //for setting the in-game music to on/off
const LEVEL_HTML = document.querySelector(".level"); //for setting the in-game level
const GAME_OVER_PROMPT = document.querySelector(".game-over-prompt"); //for displaying game over prompt
const GAME_OVER_SCORE = document.querySelector(".game-over-score"); //for displaying game over score within the game over prompt

//Colors
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
const WHITE_COLOR = "rgb(255, 255, 255)";
const BULLET_COLOR = "rgb(255, 255, 0)";
const BLACK_COLOR = "rgb(0, 0, 0)";
const DARKRED_COLOR = "rgb(139, 0, 0)";
const RED_COLOR = "rgb(255, 0, 0)";
const ORANGE_COLOR = "rgb(255, 165, 0)";

/*------------------------------------*\
  #SOUND CONSTANTS USING HOWLER LIBRARY
\*------------------------------------*/
var FIRE_SOUND = new Howl({
  src: ["assets/sounds/fire.webm", "assets/sounds/fire.mp3"]
});
var BANG_SMALL_ASTEROID_SOUND = new Howl({
  src: ["assets/sounds/bang-small.webm", "assets/sounds/bang-small.mp3"]
});
var BANG_MEDIUM_ASTEROID_SOUND = new Howl({
  src: ["assets/sounds/bang-medium.webm", "assets/sounds/bang-medium.mp3"]
});
var BANG_LARGE_ASTEROID_SOUND = new Howl({
  src: ["assets/sounds/bang-large.webm", "assets/sounds/bang-large.mp3"]
});
var GAME_MUSIC = new Howl({
  src: ["assets/sounds/game-music.webm", "assets/sounds/game-music.mp3"],
  loop: true,
});