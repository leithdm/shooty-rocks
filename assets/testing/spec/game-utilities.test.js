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

describe("test to check whether this is a collision between the ship and an asteroid", () => {
    let ship; 
    let asteroid; 
    let asteroidsArray = []; //mock an asteroidsArray

    beforeEach(() => {
        ship = new Ship(); 
        ship.x = 600; //initially move the ship away from the centre of the game canvas
        ship.y = 300; 

        asteroid = new Asteroid();  
        asteroid.x = 550; //have the asteroid collide with the ship
        asteroid.y = 300; 
        asteroidsArray.push(new Asteroid());
      });

    it("if there is a collision the ship should move back to the centre of the game canvas", () => {
        expect(checkCollisionShipAsteroid).toBeDefined(); 
    });
});
