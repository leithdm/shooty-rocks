let ship;

beforeEach(() => {
  ship = new Ship();
});

it("test we can create a visible ship", () => {
  expect(ship).toBeDefined();
  expect(ship.visible).toBeTrue();
});

describe("test the ships rotation", () => {
  it("ship should rotate to the right by +5 degrees from a starting position of 90 degrees when ship moved to the right x1 time", () => {
    expect(ship.rotate).toBeDefined();
    ship.rotate(RIGHT);
    expect(ship.angle).toBe(95);
  });
  it("ship should rotate to the left by -5 degrees from a starting position of 90 degrees when ship moved to the left x1 time", () => {
    expect(ship.rotate).toBeDefined();
    ship.rotate(LEFT);
    expect(ship.angle).toBe(85);
  });
  it("ship should rotate to the right by +360 degrees from a starting position of 90 degrees when ship is moved to the right x72 times", () => {
    expect(ship.rotate).toBeDefined();
    for (let i = 0; i < 72; i++) {
      ship.rotate(RIGHT);
    }
    expect(ship.angle).toBe(450);
  });
  it("ship should rotate to the left by -360 degrees from a starting position of 90 degrees when ship is moved to the left x72 times", () => {
    expect(ship.rotate).toBeDefined();
    for (let i = 0; i < 72; i++) {
      ship.rotate(LEFT);
    }
    expect(ship.angle).toBe(-270);
  });
});

describe("test we are correctly converting the ships angle in degrees to radians", () => {
  it("should convert 90 degrees starting position to 0 radians", () => {
    expect(convertAngleToRadians(ship.angle)).toBeDefined();
    expect(convertAngleToRadians(ship.angle)).toBeCloseTo(1.5708, 2);
  });
  it("should convert 0 degrees to 0 radians", () => {
    ship.angle = 0;
    expect(convertAngleToRadians(ship.angle)).toBe(0);
  });
  it("should convert 180 degrees to approx. 3.141 radians", () => {
    ship.angle = 180;
    expect(convertAngleToRadians(ship.angle)).toBeCloseTo(3.14, 2);
  });
});

describe("test we are updating the ships y position when moving forward in y-direction", () => {
  beforeEach(() => {
    ship = new Ship();
    //initial conditions with ship starting at x=400px, y=300px
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    ship.movingForward = true;
    ship.frictionConstant = 1.0; 
  });
  it("should move the ship forward by 0.1px starting at 90 degrees in y-direction if ship is moved forward x1 time", () => {
    expect(ship.updateShip).toBeDefined();
    expect(ship.movingForward).toBeTrue();
    //move ship in y-direction by "1 press" of keyboard
    ship.updateShip();
    expect(ship.velY).toBe(0.1);
    expect(ship.y).toBe(299.9);
  });
  it("should move the ship forward by 1.0px starting at 90 degrees in y-direction if ship is moved forward x10 times in y-direction", () => {
    expect(ship.movingForward).toBeTrue();
    //move ship in y-direction by "10 presses" of keyboard
    for (let i = 0; i < 10; i++) {
      ship.updateShip();
    }
    expect(ship.velY).toBeCloseTo(1.0, 2);
    expect(ship.y).toBe(294.5);
  });
});

describe("test we are updating the ships x position when moving forward in x-direction", () => {
  beforeEach(() => {
    ship = new Ship();
    //initial conditions with ship in the middle of the hypothetical canvas
    ship.angle = 0;
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    ship.movingForward = true;
    ship.frictionConstant = 1.0; 
  });
  it("should move the ship forward by 0.1px in x-direction starting at 0 degrees if ship is moved forward x1 times in x-direction", () => {
    expect(ship.movingForward).toBeTrue();
    //move ship in x-direction by "1 press" of keyboard
    ship.updateShip();
    expect(ship.velX).toBe(0.1, 2);
    expect(ship.x).toBeCloseTo(399.9, 2);
  });
  it("should move the ship forward by 1.0px in x-direction starting at 0 degrees if ship is moved forward x10 times in x-direction", () => {
    expect(ship.movingForward).toBeTrue();
    //move ship in x-direction by "1 press" of keyboard
    for (let i = 0; i < 10; i++) {
      ship.updateShip();
    }
    expect(ship.velX).toBeCloseTo(1.0, 2);
    expect(ship.x).toBe(394.5);
  });
});

describe("test we are updating both the ships x and y position when moving forward in x and y direction", () => {
  beforeEach(() => {
    ship = new Ship();
    //initial conditions with ship in the middle of the hypothetical canvas
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    ship.movingForward = true;
  });
  it("should move the ship forward by 0.07px in x-direction and 0.07px in y-direction starting at 45 degrees if ship is moved forward x1 time", () => {
    expect(ship.movingForward).toBeTrue();
    ship.angle = 45;
    ship.updateShip();
    expect(ship.velX).toBeCloseTo(0.07, 2);
    expect(ship.velY).toBeCloseTo(0.07, 2);
    expect(ship.x).toBeCloseTo(399.93, 2);
    expect(ship.y).toBeCloseTo(299.93, 2);
  });
  it("should move the ship forward by 0.07px in x-direction and 0.07px in y-direction starting at 135 degrees if ship is moved forward x1 time", () => {
    expect(ship.movingForward).toBeTrue();
    ship.angle = 135;
    ship.updateShip();
    expect(ship.velX).toBeCloseTo(-0.07, 2);
    expect(ship.velY).toBeCloseTo(0.07, 2);
    expect(ship.x).toBeCloseTo(400.07, 2);
    expect(ship.y).toBeCloseTo(299.93, 2);
  });
});

describe("test if the ship is off-screen. If true, make it re-enter on opposite side of screen", () => {
  beforeEach(() => {
    ship = new Ship();
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    ship.movingForward = true;
    ship.frictionConstant = 1.0; 
  });
  it("the ship.x should change to the canvas width once the ship is < than 0px", () => {
    expect(ship.movingForward).toBeTrue();
    ship.x = 0;  
    ship.angle = 0;
    expect(ship.x).toBe(0);
    for(let i=0; i<2; i++) {
      //run updateShip() once to move ship by 0.1px from 0px.  
      //when run a second time, ship is moved from canvasWidth - velX(which is 0.2px after the 2nd run)
      ship.updateShip();
    }
    expect(ship.x).toBe(canvasWidth - 0.2);
  });
  it("the ship.x should change to 0px once the ship is > than canvasWidth", () => {
    expect(ship.movingForward).toBeTrue();
    ship.x = canvasWidth;  
    ship.angle = 180;
    expect(ship.x).toBe(canvasWidth);
    for(let i=0; i<2; i++) {
      //run updateShip() once to move ship by 0.1px from canvasWidth.  
      //when run a second time, ship is moved from 0px + velX(which is 0.2px after the 2nd run)
      ship.updateShip();
    }
    expect(ship.x).toBe(0.2);
  });
  it("the ship.y should change to 0px once the ship is > than canvasHeight", () => {
    expect(ship.movingForward).toBeTrue();
    ship.y = canvasHeight;  
    ship.angle = 270;
    expect(ship.y).toBe(canvasHeight);
    for(let i=0; i<2; i++) {
      //run updateShip() once to move ship by 0.1px from canvasHeight.  
      //when run a second time, ship is moved from 0px + velY(which is 0.2px after the 2nd run)
      ship.updateShip();
    }
    expect(ship.y).toBe(0.2);
  });
  it("the ship.y should change to 800px once the ship is < than 0px", () => {
    expect(ship.movingForward).toBeTrue();
    ship.y = 0;  
    ship.angle = 90;
    expect(ship.y).toBe(0);
    for(let i=0; i<2; i++) {
      //run updateShip() once to move ship by 0.1px from 0px.  
      //when run a second time, ship is moved from canvasHeight - velY(which is 0.2px after the 2nd run)
      ship.updateShip();
    }
    expect(ship.y).toBe(canvasHeight - 0.2);
  });
});

describe("test if the ship slows down, and eventually stops, due to friction when no longer moving forward in y-direction", () => {
  it("ship should feel friction constant of 0.99 when ship moves forward x1 time in y-direction", () => {
    //conditions
    ship.movingForward = true; 
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    expect(ship.movingForward).toBeTrue();
    ship.visible = true; 

    ship.updateShip(); 
    expect(ship.velY).toBe(0.099);
    expect(ship.y).toBe(299.901);
  });
  it("ship should slow down and eventually stop due to friction constant of 0.99 in y-direction", () => {
    //conditions
    ship.movingForward = true; 
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    expect(ship.movingForward).toBeTrue();
    ship.visible = true; 

    for(let i=0; i<10; i++) {
      ship.updateShip(); 
    }
    //stop moving the ship forward
    ship.movingForward = false; 
    
    //call updateShip() x300 times and find resultant velY
    for(let i=0; i<300; i++) {
      ship.updateShip(); 
    }
    expect(ship.velY).toBeCloseTo(0.0, 1);
  });
});

describe("test if the ship slows down, and eventually stops, due to friction when no longer moving forward in x-direction", () => {
  it("ship should feel friction constant of 0.99 when ship moves forward x1 time in x-direction", () => {
    //conditions
    ship.movingForward = true; 
    ship.angle = 0; 
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    expect(ship.movingForward).toBeTrue();
    ship.visible = true; 

    ship.updateShip(); 
    expect(ship.velX).toBe(0.099);
    expect(ship.x).toBe(399.901);
  });
  it("ship should slow down and eventually stop due to friction constant of 0.99 in x-direction", () => {
    //conditions
    ship.movingForward = true; 
    ship.angle = 0; 
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(ship.velX).toBe(0);
    expect(ship.velY).toBe(0);
    expect(ship.movingForward).toBeTrue();
    ship.visible = true; 

    for(let i=0; i<10; i++) {
      ship.updateShip(); 
    }
    //stop moving the ship forward
    ship.movingForward = false; 
    
    //call updateShip() x300 times and find resultant velX
    for(let i=0; i<300; i++) {
      ship.updateShip(); 
    }
    expect(ship.velX).toBeCloseTo(0.0, 1);
  });
});

describe("test ship has draw() method", () => {
  it("should have draw() method defined", () => {
    expect(ship.drawShip).toBeDefined(); 
  });
});