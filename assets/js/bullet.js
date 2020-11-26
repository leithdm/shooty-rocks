class Bullet {
  constructor() {
    this.visible = true;
    this.angle = ship.angle;
    this.x = ship.x;
    this.y = ship.y;
    this.speed = BULLET_SPEED;
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
    this.collisionRadius = BULLET_COLLISION_RADIUS;
  }

  updateBullet() {
    let radians = convertAngleToRadians(this.angle);
    this.y -= Math.sin(radians) * this.speed;
    this.x -= Math.cos(radians) * this.speed;
  }

  drawBullet() {
    context.fillStyle = BULLET_COLOR;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
