class Asteroid {
  constructor(x, y, radius, size, collisionRadius, speed, radiusOffsetArray) {
    this.visible = true;
    this.x = x || Math.floor(Math.random() * canvasWidth); 
    this.y = y || Math.floor(Math.random() * canvasHeight); 
    this.angle = Math.floor(Math.random() * 359);
    this.speed = speed || 1;
    this.radius = radius || 60; 
    this.collisionRadius = collisionRadius || 56; 
    this.size = size || LARGE_ASTEROID_SIZE
    this.radiusOffsetArray = radiusOffsetArray || []; //an array of radius offset values to make irregular shapes
    this.vertices = Math.floor(Math.random() * (ASTEROID_VERTICES + 1) + ASTEROID_VERTICES / 2); //a range of vertices to create different polygon shapes
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
    context.strokeStyle = "white";
    context.lineWidth = 2;
    context.beginPath();
    let radians = convertAngleToRadians((Math.PI * 2) / this.vertices);

    context.moveTo(
      //nose of asteroid
      this.x - this.radius * Math.cos(radians),
      this.y - this.radius * Math.sin(radians)
    );
    for (let i = 1; i < this.vertices; i++) {
        context.lineTo(
            this.x - this.radius * this.radiusOffsetArray[i] * Math.cos(((Math.PI * 2) / this.vertices) * i + radians),
            this.y - this.radius * this.radiusOffsetArray[i] * Math.sin(((Math.PI * 2) / this.vertices) * i + radians)
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
            // colorfulAsteroidsFill(); 
            context.strokeStyle = "darkgray"; 
            context.fillStyle = "rgb(0, 192, 163)"; 
            context.fill(); 
        }

        //default stroke for large asteroid
        context.stroke();
  }
}
