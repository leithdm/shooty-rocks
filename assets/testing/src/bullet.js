class Bullet {
  constructor() {
    this.visible = true;
    this.angle = ship.angle;
    this.x = ship.x;
    this.y = ship.y;
    this.speed = 5;
    this.width = 4; 
    this.height = 4; 
  }

  updateBullet() {
    let radians = convertAngleToRadians(this.angle);
    this.y -= Math.sin(radians) * this.speed;
    this.x -= Math.cos(radians) * this.speed;
  }

  drawBullet() {
    context.fillStyle = "white"; 
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
