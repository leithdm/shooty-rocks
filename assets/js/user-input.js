//for listening to keyboard input
function setupKeyboardInput() {
    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);
  }

  //for setting the keysArray[] value for a particular key to true when that key is pressed
  function handleKeyDown(e){
    if(ship.visible) {
      keysArray[e.keyCode] = true;
    }
  }

  //for setting the keysArray value for a particular key to false when that key is unpressed
  //if the key that is unpressed is the KEY_SHOOT, then fire a bullet
  function handleKeyUp(e){
    keysArray[e.keyCode] = false;
    if(ship.visible) {
      if (e.keyCode === KEY_SHOOT){
          if(_soundfxOn == ON) {
           FIRE_SOUND.play();
          }
        bulletsArray.push(new Bullet(ship.angle));
      }
    }
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

  //for creating the touchscreen gamepad controller event listeners, and performing relevant actions
function setupGamePadController() {
    //prevents pinch-to-zoom on iOS mobile
    document.addEventListener('touchmove', (event) => {
        event.preventDefault();
      },  {passive: false });

    LEFT_BUTTON.addEventListener("touchstart", ()=> {
    keysArray[KEY_LEFT_ARROW] = true;
  });
    LEFT_BUTTON.addEventListener("touchend", ()=> {
    keysArray[KEY_LEFT_ARROW] = false;
  });
    RIGHT_BUTTON.addEventListener("touchstart", ()=> {
    keysArray[KEY_RIGHT_ARROW] = true;
  });
    RIGHT_BUTTON.addEventListener("touchend", ()=> {
    keysArray[KEY_RIGHT_ARROW] = false;
  });
    FIRE_BUTTON.addEventListener("touchstart", ()=> {
    if(ship.visible) {
      if(_soundfxOn == ON) {
      FIRE_SOUND.play();
      }
      bulletsArray.push(new Bullet(ship.angle));
      }
  });
    THRUST_BUTTON.addEventListener("touchstart", ()=> {
    keysArray[KEY_UP_ARROW] = true;
  });
    THRUST_BUTTON.addEventListener("touchend", ()=> {
    keysArray[KEY_UP_ARROW] = false;
  });
}
