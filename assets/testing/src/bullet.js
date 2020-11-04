class Bullet {
    constructor() {
        this.visible = true; 
        this.angle = ship.angle; 
        this.x = ship.x; 
        this.y = ship.y; 
        this.speed = 5; 
    }

    updateBullet() {
        let radians = convertAngleToRadians(this.angle); 
        this.y -= Math.sin(radians) * this.speed; 
    }
}