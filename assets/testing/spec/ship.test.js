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