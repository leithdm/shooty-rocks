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

  //for checking if there is a collision between ship and asteroid
  function checkCollisionShipAsteroid() {
    if(ship.visible) {
      if(ship.invincibility < -SHIP_INVINCIBILITY_TIMEOUT) {
        if (asteroidsArray.length !== 0) {
          for (let i=0; i<asteroidsArray.length; i++) {
            if (collisionDetection(ship.x, ship.y, ship.collisionRadius,
              asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].collisionRadius)) {
                if(_soundfxOn == ON) {
                  BANG_LARGE_ASTEROID_SOUND.play();
              }
              drawShipExplosion();
              //reduce number of lives
              _lives--;
              //if lives is 1, make it blink
              if(_lives === 1) {
                LIVES_HTML.classList.add("lives-blinking");
                }
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
              //set the ship to invisible if ship-lives are zero and set screen text to GAME OVER
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

  //for checking if there is a collison between a bullet and an asteroid
  function checkCollisionBulletAsteroid() {
    if (asteroidsArray.length !== 0 && bulletsArray.length !== 0) {
      for (let i=0; i<asteroidsArray.length; i++) {
        for (let j=0; j<bulletsArray.length; j++) {
          if(collisionDetection(bulletsArray[j].x, bulletsArray[j].y, bulletsArray[j].collisionRadius,
            asteroidsArray[i].x, asteroidsArray[i].y, asteroidsArray[i].collisionRadius)) {
            //if asteroid is a large asteroid, break it up into x2 medium asteroids
            if(asteroidsArray[i].size === LARGE_ASTEROID_SIZE) {
              //play sound
              if(_soundfxOn == ON) {
               BANG_LARGE_ASTEROID_SOUND.play();
              }
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
                score += SCORE_LARGE_ASTEROID;

              //if asteroid is a medium asteroid, break it up into x2 small asteroids
              } else if (asteroidsArray[i].size === MEDIUM_ASTEROID_SIZE) {
                //play sound
                if(_soundfxOn == ON) {
                 BANG_MEDIUM_ASTEROID_SOUND.play();
                }
                drawAsteroidExplosion(i, MEDIUM_ASTEROID_EXPLOSION_FACTOR);

                //create 2 new small sized asteroids
                asteroidsArray.push(new Asteroid(asteroidsArray[i].x - ASTEROID_OFFSET,
                  asteroidsArray[i].y - ASTEROID_OFFSET,
                  asteroidsArray[i].speed+1,
                  SMALL_ASTEROID_RADIUS,
                  SMALL_ASTEROID_SIZE,
                  SMALL_ASTEROID_COLLISION_RADIUS,
                  asteroidsArray[i].radiusOffsetArray
                  ));
                  asteroidsArray.push(new Asteroid(asteroidsArray[i].x + ASTEROID_OFFSET,
                    asteroidsArray[i].y + ASTEROID_OFFSET,
                    asteroidsArray[i].speed+1,
                    SMALL_ASTEROID_RADIUS,
                    SMALL_ASTEROID_SIZE,
                    SMALL_ASTEROID_COLLISION_RADIUS,
                    asteroidsArray[i].radiusOffsetArray
                    ));
                    score += SCORE_MEDIUM_ASTEROID;

                 //if asteroid is a small asteroid
                  } else {
                   if(_soundfxOn == ON) {
                    BANG_SMALL_ASTEROID_SOUND.play();
                   }
                   drawAsteroidExplosion(i, SMALL_ASTEROID_EXPLOSION_FACTOR);
                   score += SCORE_SMALL_ASTEROID;
                  }

            //set html score value
            SCORE_HTML.textContent = numberWithCommas(score);
            //remote the bullet and the asteroid from relevant arrays
            asteroidsArray.splice(i, 1);
            bulletsArray.splice(j, 1);
            break;
          }
        }
      }
    }
  }