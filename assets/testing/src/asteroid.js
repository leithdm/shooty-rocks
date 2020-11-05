class Asteroid {
  constructor() {
    this.visible = true;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.angle = 90;
    this.speed = 1;
  }

  updateAsteroid() {
    let radians = convertAngleToRadians(this.angle);

    this.x += Math.cos(radians) * this.speed;
    this.y += Math.sin(radians) * this.speed;

    //if asteroid goes off screen move to opposite side
    if (this.x < 0) {
      this.x = canvasWidth;
    }
    if (this.x > canvasWidth) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = canvasHeight;
    }
    if (this.y > canvasHeight) {
      this.y = 0;
    }
  }
}
