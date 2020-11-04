let asteroid;

beforeEach(() => {
  asteroid = new Asteroid();
});

it("test we can create an instance of an asteroid and that it is visible", () => {
  expect(asteroid).toBeDefined();
  expect(asteroid.visible).toBeTrue();
});
