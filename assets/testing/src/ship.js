class Ship {
  constructor() {
    this.visible = true;
    this.movingForward = false;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.speed = 0.1;
    this.rotationSpeed = 5;
    this.angle = 90;
    this.velX = 0;
    this.velY = 0;
    this.radius = 15; 
  }

  rotate(direction) {
    //direction = 1 for right, and -1 for left
    this.angle += this.rotationSpeed * direction;
  }

  updateShip() {
    let radians = convertAngleToRadians(this.angle);
    if (this.movingForward) {
        this.velX += Math.cos(radians) * this.speed; 
        this.velY += Math.sin(radians) * this.speed; 
    }

    if(this.x < 0) {
        this.x = canvasWidth; 
    }
    if(this.x > canvasWidth) {
        this.x = 0; 
    }
    if(this.y > canvasHeight) {
        this.y = 0; 
    }
    if(this.y < 0) {
        this.y = canvasHeight; 
    }

    this.y -= this.velY; 
    this.x -= this.velX;
  }
}
