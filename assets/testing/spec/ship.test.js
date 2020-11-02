let ship;

beforeEach(() => {
  ship = new Ship();
});

it("should create a ship", () => {
  expect(ship).toBeDefined();
});
