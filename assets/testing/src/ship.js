class Ship {
  constructor() {
    this.visible = true;
    this.movingForward = false;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.rotationSpeed = 5;
    this.angle = 0;
    this.velX = 0;
    this.velY = 0;
  }

  rotate(direction) {
    this.angle += this.rotationSpeed * direction;
  }
}
