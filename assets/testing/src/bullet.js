class Bullet {
  constructor() {
    this.visible = true;
    this.angle = ship.angle;
    this.x = ship.x;
    this.y = ship.y;
    this.speed = 10;
    this.width = 4; 
    this.height = 4; 
    this.collisionRadius = 3; 
  }

  updateBullet() {
    let radians = convertAngleToRadians(this.angle);
    this.y -= Math.sin(radians) * this.speed;
    this.x -= Math.cos(radians) * this.speed;
  }

  drawBullet() {
    context.fillStyle = "yellow" 
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
