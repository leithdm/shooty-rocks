describe("test collision detection between ship and asteroid", () => {
    let ship; 
    let asteroid; 

    beforeEach(() => {
        ship = new Ship(); 
        ship.collisionRadius = 10; 
        ship.x = 400; 
        ship.y = 300; 

        asteroid = new Asteroid();
        asteroid.collisionRadius = 10; 
        asteroid.x = 415; 
        asteroid.y = 300; 
      });

    it("should determine there is a collision between a ship and asteroid, given a valid collision", () => {
        expect(ship).toBeDefined();  
        expect(ship.collisionRadius).toBe(10);  
        expect(ship.x).toBe(400);  
        expect(ship.y).toBe(300);  

        expect(asteroid).toBeDefined();  
        expect(asteroid.collisionRadius).toBe(10);  
        expect(asteroid.x).toBe(415);  
        expect(asteroid.y).toBe(300);  

        //the ship is at 410px, and the asteroid is at 405px --> a collision !
        expect(collisionDetection(ship.x, ship.y, ship.collisionRadius, asteroid.x, asteroid.y, asteroid.collisionRadius )).toBe(true);
    });
    it("should determine there is not a collision between a ship and asteroid if they only touch off each other", () => {
        expect(ship).toBeDefined();  
        expect(ship.collisionRadius).toBe(10);  
        expect(ship.x).toBe(400);  
        expect(ship.y).toBe(300);  

        expect(asteroid).toBeDefined();  
        expect(asteroid.collisionRadius).toBe(10);  
        asteroid.x = 420; 
        expect(asteroid.x).toBe(420);  
        expect(asteroid.y).toBe(300);  

        //the ship is at 410px, and the asteroid is at 410px --> not a collision !
        expect(collisionDetection(ship.x, ship.y, ship.collisionRadius, asteroid.x, asteroid.y, asteroid.collisionRadius )).toBe(false);
    });
    it("should determine there is a collision between a ship and asteroid if they collide by just 1px", () => {
        expect(ship).toBeDefined();  
        expect(ship.collisionRadius).toBe(10);  
        expect(ship.x).toBe(400);  
        expect(ship.y).toBe(300);  

        expect(asteroid).toBeDefined();  
        expect(asteroid.collisionRadius).toBe(10);  
        asteroid.x = 419; 
        expect(asteroid.x).toBe(419);  
        expect(asteroid.y).toBe(300);  

        //this ship is at 410px, and the asteroid is at 409px --> a collision !
        expect(collisionDetection(ship.x, ship.y, ship.collisionRadius, asteroid.x, asteroid.y, asteroid.collisionRadius )).toBe(true);
    });
});

describe("test that we have a collision detection method between a ship and an asteroid", () => {
    it("should have a checkCollisionShipAsteroid() method", () => {
        expect(checkCollisionShipAsteroid).toBeDefined(); 
    });
});

describe("test that we have a collision detection method between a bullet and an asteroid", () => {
    it("should have a checkCollisionBulletAsteroid() method", () => {
        expect(checkCollisionBulletAsteroid).toBeDefined(); 
    });
});
