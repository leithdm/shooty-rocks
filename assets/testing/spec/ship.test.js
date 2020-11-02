let ship;

beforeEach(() => {
  ship = new Ship();
});

it("should create a ship", () => {
  expect(ship).toBeDefined();
  expect(ship.visible).toBeTrue();
});


describe("ship rotation", () => {
  it("ship should rotate to the right by 5 degrees when ship moved to the right x1 time", () => {
    expect(ship.rotate).toBeDefined();
    ship.rotate(RIGHT);
    expect(ship.angle).toBe(5);
  });
  it("ship should rotate to the left by -5 degrees when ship moved to the left x1 time", () => {
    expect(ship.rotate).toBeDefined();
    ship.rotate(LEFT);
    expect(ship.angle).toBe(-5);
  });
  it("ship should rotate to the right by 360 degrees when ship is moved to the right x72 times", () => {
    expect(ship.rotate).toBeDefined();
    for (let i = 0; i < 72; i++) {
      ship.rotate(RIGHT);
    }
    expect(ship.angle).toBe(360);
  });
  it("ship should rotate to the left by 360 degrees when ship is moved to the left x72 times", () => {
    expect(ship.rotate).toBeDefined();
    for (let i = 0; i < 72; i++) {
      ship.rotate(LEFT);
    }
    expect(ship.angle).toBe(-360);
  });
});


describe("convert ship angle to radians", () => {
  it("should convert 0 degrees starting position to 0 radians", () => {
    expect(convertAngleToRadians(ship.angle)).toBeDefined();
    expect(convertAngleToRadians(ship.angle)).toBe(0);
  });
  it("should convert 90 degrees to approx. 1.571 radians", () => {
      ship.angle = 90;
      expect(convertAngleToRadians(ship.angle)).toBeCloseTo(1.57, 2);
  });
  it("should convert 180 degrees to approx. 3.141 radians", () => {
      ship.angle = 180;
      expect(convertAngleToRadians(ship.angle)).toBeCloseTo(3.14, 2);
  });
});