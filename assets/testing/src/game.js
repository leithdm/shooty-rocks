let canvas;
let ship;
let keysArray = [];
let bulletsArray = [];
let asteroidsArray = [];
let score = 0; 

/**************************************************/
/*Reference 'game-utilities' for abstracted code  */
/**************************************************/

window.onload = () => {
  //setup the game canvas
  setupCanvas();

  //draw the game canvas
  renderGameCanvas();

  //instantiate a new ship
  ship = new Ship();

  //create asteroids, and push into asteroidsArray
  createAsteroids();

  //setup keyboard to listen for input
  setupKeyboardInput();

  //render everything to the canvas
  renderGame();
};

function renderGame() {
  //check if ship moving forward, left or right
  checkKeyboardInput();

  //clear the canvas, to get ready for the next frame
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  //render the game canvas
  renderGameCanvas();

  //render starts to the game canvas
  renderStars(); 

  //create a new level
  createNewLevel(); 

  //check if collision between ship and asteroid
  checkCollisionShipAsteroid(); 

  //check if collision between a bullet and asteroid
  checkCollisionBulletAsteroid();  
  
  //update the ships position
  ship.updateShip();

  //render the ship
  ship.drawShip();

  //render the bullets
  renderBullets();

  //render the asteroids
  renderAsteroids();

  //automated frame per second game loop. More efficient than setInterval()
  requestAnimationFrame(renderGame);
}
