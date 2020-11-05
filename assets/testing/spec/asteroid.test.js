let asteroid;

beforeEach(() => {
  asteroid = new Asteroid();
});

it("test we can create an instance of an asteroid and that it is visible", () => {
  expect(asteroid).toBeDefined();
  expect(asteroid.visible).toBeTrue();
});

describe("test we are updating the asteroids y position when moving forward in y-direction", () => {
  beforeEach(() => {
    asteroid = new Asteroid();
    //initial conditions with asteroid starting at x=400px, y=300px
    expect(asteroid.x).toBe(400);
    expect(asteroid.y).toBe(300);
  });
  it("should move the asteroid forward by 1.0 px starting at 90 degrees in y-direction if asteroid is moved forward x1 time", () => {
    expect(asteroid.updateAsteroid).toBeDefined();
    //move asteroid in y-direction by 1 frame
    asteroid.updateAsteroid();
    expect(asteroid.y).toBe(301);
  });
  it("should move the asteroid forward by 10px starting at 90 degrees in y-direction if asteroid is moved forward x10 times in y-direction", () => {
    //move asteroid in y-direction by 10 frames
    for (let i = 0; i < 10; i++) {
      asteroid.updateAsteroid();
    }
    expect(asteroid.y).toBe(310);
  });
});

describe("test we are updating the asteroids x position when moving forward in x-direction", () => {
  beforeEach(() => {
    asteroid = new Asteroid();
    asteroid.angle = 0;
    expect(asteroid.x).toBe(400);
    expect(asteroid.y).toBe(300);
    expect(asteroid.angle).toBe(0);
  });
  it("should move the asteroid forward by 1.0 px in x-direction starting at 0 degrees if asteroid is moved forward x1 times in x-direction", () => {
    //move asteroid in x-direction by 1 frame
    asteroid.updateAsteroid();
    expect(asteroid.x).toBeCloseTo(401, 2);
  });
  it("should move the asteroid forward by 10 px in x-direction starting at 0 degrees if asteroid is moved forward x10 times in x-direction", () => {
    //move asteroid in x-direction by 10 frames
    for (let i = 0; i < 10; i++) {
      asteroid.updateAsteroid();
    }
    expect(asteroid.x).toBe(410);
  });
});

describe("test we are updating both the asteroids x and y position when moving forward in x and y direction", () => {
  beforeEach(() => {
    asteroid = new Asteroid();
    asteroid.angle = 45;
    expect(asteroid.x).toBe(400);
    expect(asteroid.y).toBe(300);
    expect(asteroid.angle).toBe(45);
  });
  it("should move the asteroid forward by 0.71px in x-direction and 0.71px in y-direction starting at 45 degrees if asteroid is moved forward x1 time", () => {
    asteroid.updateAsteroid();
    expect(asteroid.x).toBeCloseTo(400.71, 2);
    expect(asteroid.y).toBeCloseTo(300.71, 2);
  });
  it("should move the asteroid forward by 0.71px in x-direction and 0.71px in y-direction starting at 135 degrees if asteroid is moved forward x1 time", () => {
    asteroid.angle = 135;
    asteroid.updateAsteroid();
    expect(asteroid.x).toBeCloseTo(399.29, 2);
    expect(asteroid.y).toBeCloseTo(300.71, 2);
  });
});

describe("test if the asteroid is off-screen. If true, make it re-enter on opposite side of screen", () => {
  beforeEach(() => {
    asteroid = new Asteroid();
  });
  it("the asteroid.x should change to 0 px once the asteroid is > than canvasWidth", () => {
    asteroid.x = canvasWidth;
    asteroid.angle = 0;
    expect(asteroid.x).toBe(canvasWidth);
    asteroid.updateAsteroid();
    expect(asteroid.x).toBe(0);
  });
  it("the asteroid.x should change to canvasWidth once the asteroid is < than 0px", () => {
    asteroid.x = 0;
    asteroid.angle = 180;
    expect(asteroid.x).toBe(0);
    for (let i = 0; i < 2; i++) {
      //run updateAsteroid() once to move asteroid by 1 px from 0 to canvasWidth.
      //when run a second time, asteroid is moved from 0px + asteroid.x (which is 2px after the 2nd run)
      asteroid.updateAsteroid();
    }
    expect(asteroid.x).toBe(canvasWidth - 1);
  });
  it("the asteroid.y should change to canvasHeight once the asteroid is < than 0px", () => {
    asteroid.y = 0;
    asteroid.angle = 270;
    expect(asteroid.y).toBe(0);
    asteroid.updateAsteroid();
    expect(asteroid.y).toBe(600);
  });
  it("the asteroid.y should change to 0px once the asteroid is > than canvasHeight", () => {
    asteroid.y = canvasHeight;
    asteroid.angle = 90;
    expect(asteroid.y).toBe(canvasHeight);
    for (let i = 0; i < 2; i++) {
      //run updateAsteroid() once to move asteroid by 1px from canvasHeight to 0px.
      //when run a second time, asteroid is moved from 0 + asteroid.y (which is 2px after the 2nd run)
      asteroid.updateAsteroid();
    }
    expect(asteroid.y).toBe(1);
  });
});
