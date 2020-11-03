let ship;

beforeEach(() => {
  ship = new Ship();
});

it("should create a ship", () => {
  expect(ship).toBeDefined();
  expect(ship.visible).toBeTrue();
});

// SHIP ROTATION
describe("ship rotation", () => {
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

// CONVERT SHIP ANGLE IN DEGREES TO RADIANS
describe("convert ship angle to radians", () => {
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

// UPDATE THE SHIPS POSITION IN X and Y-DIRECTION WHEN MOVING IN X and Y-DIRECTION
describe("update ships position in y-direction when moving in y-direction", () => {
  beforeEach(() => {
    ship = new Ship();
        //initial conditions with ship in the middle of the hypothetical canvas
        expect(ship.x).toBe(400);
        expect(ship.y).toBe(300);
        expect(ship.velX).toBe(0);
        expect(ship.velY).toBe(0);
        ship.movingForward = true;
  });
  it("should move the ship forward by 0.1px in y-direction if ship is moved forward x1 time in y-direction", () => {
    expect(ship.updateShip).toBeDefined();
    expect(ship.movingForward).toBeTrue();
    //move ship in y-direction by "1 press" of keyboard
    ship.updateShip();
    expect(ship.velY).toBe(0.1);
  });
  it("should move the ship forward by 1.0px in y-direction if ship is moved forward x10 times in y-direction", () => {
    expect(ship.updateShip).toBeDefined();
    expect(ship.movingForward).toBeTrue();
    //move ship in y-direction by "10 presses" of keyboard
    for (let i = 0; i < 10; i++) {
      ship.updateShip();
    }
    expect(ship.velY).toBeCloseTo(1.0, 2);
  });
});
