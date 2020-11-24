class Ship {
  constructor() {
    this.visible = true;
    this.movingForward = false;
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.speed = 0.1;
    this.rotationSpeed = 5;
    this.angle = 90;
    this.velX = 0;
    this.velY = 0;
    this.radius = 12;
    this.frictionConstant = 0.99;
    this.collisionRadius = 9;
    this.invincibility = 0;
  }

  rotate(direction) {
    //direction = 1 for right, and -1 for left
    this.angle += this.rotationSpeed * direction;
  }

  updateShip() {
    //if the ship invinciblity timer has passed 3 seconds, set the timer to a static value of 3.01 to stop countdown
    if (ship.invincibility < -SHIP_INVINCIBILITY_TIMEOUT) {
      ship.invincibility = -(SHIP_INVINCIBILITY_TIMEOUT + 1);
    }
    //start the countdown timer
    ship.invincibility--;

    //update ships velocity in x and y direction
    let radians = convertAngleToRadians(this.angle);
    if (this.movingForward) {
      this.velX += Math.cos(radians) * this.speed;
      this.velY += Math.sin(radians) * this.speed;
    }

    //determine if ship is off the screen
    this.checkIfShipOffScreen();

    //add friction
    this.velY *= this.frictionConstant;
    this.velX *= this.frictionConstant;

    //update x and y positions of ship
    this.y -= this.velY;
    this.x -= this.velX;
  }

  checkIfShipOffScreen() {
    if (this.x < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (this.x > CANVAS_WIDTH) {
      this.x = 0;
    }
    if (this.y > CANVAS_HEIGHT) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = CANVAS_HEIGHT;
    }
  }

  drawShip() {
    if(ship.visible) {
      context.strokeStyle = "white";
      context.lineWidth = 3;

      //to give the ship a colored blinking effect when invincible and having lost at least 1 life
      if (ship.invincibility >= -SHIP_INVINCIBILITY_TIMEOUT && _lives <= 2) {
        context.strokeStyle = invincibleShipStroke();
      }

      //begin tracing out the shape of the ship
      context.beginPath();

      //determine the angle at each vertice of the triangular ship
      let verticeAngle = (Math.PI * 2) / 2.5; //approx. a 144 degree angle. We want the ship to have an isosceles shape
      let radians = convertAngleToRadians(this.angle);

      //move to the back of ship (right-hand side)
      context.moveTo(
        this.x - this.radius * Math.cos(verticeAngle + radians),
        this.y - this.radius * Math.sin(verticeAngle + radians)
      );

      //now trace a line to the nose of ship
      context.lineTo(
        this.x - this.radius * Math.cos(radians),
        this.y - this.radius * Math.sin(radians)
      );

      //trace a line from the nose of ship to the back of ship (left-hand side)
      context.lineTo(
        this.x - this.radius * Math.cos(-verticeAngle + radians),
        this.y - this.radius * Math.sin(-verticeAngle + radians)
      );

      //close the path, and stroke out the entire shape
      context.closePath();
      context.stroke();

      //move back to nose of ship
      context.lineTo(
        this.x - this.radius * Math.cos(radians),
        this.y - this.radius * Math.sin(radians)
      );

      //trace a line from nose of ship to the centre of triangle.
      context.moveTo(
        this.x + Math.cos(radians) / 2,
        this.y + Math.sin(radians) / 2
      );

      //draw a small circle in centre of triangle, representing the cock-pit
      context.lineTo(this.x, this.y);
      context.arc(this.x, this.y, 3, 0, Math.PI * 2, false);

      context.stroke();
      context.fillStyle = "black";
      context.fill();

      //if ship is moving forward draw the thrust trail
      if (this.movingForward) {
        this.drawThrust();
      }
    }
  }

  drawThrust() {
    context.fillStyle = "red";
    context.strokeStyle = "yellow";

    //to give the thruster a colored blinking effect when invincible and still visible
    if (ship.invincibility >= -SHIP_INVINCIBILITY_TIMEOUT && ship.visible) {
      context.fillStyle = invincibleShipThrustFill();
      context.strokeStyle = invincibleShipStroke();
    }

    //begin tracing out the shape of the ship
    context.beginPath();

    //determine the angle at each vertice of the triangular ship
    let verticeAngle = (Math.PI * 2) / 2.5; //approx. a 144 degree angle. We want the ship to have an isosceles shape
    let radians = convertAngleToRadians(this.angle);

    //move to the back of ship (right-hand side)
    context.moveTo(
      this.x - (this.radius * Math.cos(verticeAngle + radians)) / 1.2,
      this.y - (this.radius * Math.sin(verticeAngle + radians)) / 1.2
    );

    //now draw a line (negative) to the nose of ship
    context.lineTo(
      this.x + 1.7 * this.radius * Math.cos(radians),
      this.y + 1.7 * this.radius * Math.sin(radians)
    );

    //trace a line from (negative) nose of ship to the back of ship (left-hand side)
    context.lineTo(
      this.x - (this.radius * Math.cos(-verticeAngle + radians)) / 1.2,
      this.y - (this.radius * Math.sin(-verticeAngle + radians)) / 1.2
    );

    //stroke out the entire shape and fill it in
    context.closePath();
    context.stroke();
    context.fill();
  }
}
