class Asteroid {
  constructor(x, y, speed, radius, size, collisionRadius, radiusOffsetArray) {
    this.visible = true;
    this.x = x || Math.floor(Math.random() * CANVAS_WIDTH); 
    this.y = y || Math.floor(Math.random() * CANVAS_HEIGHT); 
    this.angle = Math.floor(Math.random() * 359);
    this.speed = speed; 
    this.radius = radius || LARGE_ASTEROID_RADIUS; 
    this.collisionRadius = collisionRadius || LARGE_ASTEROID_COLLISION_RADIUS; 
    this.size = size || LARGE_ASTEROID_SIZE
    this.radiusOffsetArray = radiusOffsetArray || []; //an array of radius offset values to make irregular shapes
    this.vertices = Math.floor(Math.random() * (ASTEROID_VERTICES + 1) + ASTEROID_VERTICES / 2); //a range of vertices to create different polygon shapes
    this.color = SMALL_ASTEROID_COLOR_ARRAY[Math.floor(Math.random() * (SMALL_ASTEROID_COLOR_ARRAY.length))]; 
  }

  updateAsteroid() {
    let radians = convertAngleToRadians(this.angle);
    this.x += Math.cos(radians) * this.speed;
    this.y += Math.sin(radians) * this.speed;

    //if asteroid goes off screen move to opposite side
    if (this.x < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (this.x > CANVAS_WIDTH) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = CANVAS_HEIGHT;
    }
    if (this.y > CANVAS_HEIGHT) {
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
            context.lineWidth = 1;
            context.strokeStyle = "white";
            context.fillStyle = this.color; 
            context.fill(); 
        }

        //default stroke for large asteroid
        context.stroke();
  }
}
