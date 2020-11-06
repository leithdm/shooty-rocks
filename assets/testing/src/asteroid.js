class Asteroid {
  constructor(x, y, radius, size, collisionRadius, speed) {
    this.visible = true;
    this.x = x || Math.floor(Math.random() * canvasWidth); 
    this.y = y || Math.floor(Math.random() * canvasHeight); 
    this.angle = Math.floor(Math.random() * 359);
    this.speed = speed || 1;
    this.radius = radius || 60; 
    this.collisionRadius = collisionRadius || 56; 
    this.size = size || LARGE_ASTEROID_SIZE
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

  drawAsteroid() {
    context.beginPath();
    let randomVerticeAngle = Math.floor(Math.random() * (ASTEROID_MAX_VERTICE_ANGLE - ASTEROID_MIN_VERTICE_ANGLE) 
    + ASTEROID_MIN_VERTICE_ANGLE); 
    let verticeAngle = (Math.PI * 2) / randomVerticeAngle; //divide a 360 degree into 6 to get a hexagonal angle.
    let radians = convertAngleToRadians(verticeAngle);

    context.moveTo(
      //nose of asteroid
      this.x - this.radius * Math.cos(radians),
      this.y - this.radius * Math.sin(radians)
    );
    for (let i = 1; i < randomVerticeAngle; i++) {
        context.lineTo(
            this.x - this.radius * Math.cos(verticeAngle * i + radians),
            this.y - this.radius * Math.sin(verticeAngle * i + radians)
            );
        }
        context.closePath();

        //if medium sized, give the asteroid a colorful stroke
        if (this.size === MEDIUM_ASTEROID_SIZE) {
            colorfulAsteroidsStroke(); 
            context.stroke();
        }

        //if small sized, fill in the asteroid with a colorful fill
        if (this.size === SMALL_ASTEROID_SIZE) {
            colorfulAsteroidsFill(); 
            context.strokeStyle = "black"; 
            context.fill(); 
        }

        //default strokd for large asteroid
        context.stroke();
  }
}
