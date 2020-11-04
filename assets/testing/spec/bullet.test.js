it("test we can create an instance of a bullet", () => {
  let bullet = new Bullet();
  expect(bullet).toBeDefined();
});

describe("test we are updating the bullets y position when moving forward in y-direction", () => {
  //conditions
  let ship;
  let bullet;

  beforeEach(() => {
    ship = new Ship(); //starting at 300px in the y-direction
    bullet = new Bullet();
  });
  it("should move the bullet forward by 5px starting at 90 degree ship-angle if bullet is moved forward x1 frame", () => {
    expect(ship).toBeDefined();
    expect(ship.x).toBe(400);
    expect(bullet.updateBullet).toBeDefined();
    expect(bullet.visible).toBeTrue();
    expect(bullet.y).toBe(300); 

    //move bullet in y-direction by 5px
    bullet.updateBullet();
    expect(bullet.y).toBe(295);
  });
  it("should move the bullet forward by 20px starting at 90 degree ship-angle if bullet is moved forward x4 frames in y-direction", () => {
    //move ship in y-direction by 4 frames
    for (let i = 0; i < 4; i++) {
      bullet.updateBullet();
    }
    expect(bullet.y).toBe(280);
  });
});

describe("test we are updating the bullets x position when moving forward in x-direction", () => {
  //conditions
  let ship;
  let bullet;

  beforeEach(() => {
    ship = new Ship();
    bullet = new Bullet();
    bullet.angle = 0; //explicityly set the bullet.angle to 0 degrees
  });
  it("should move the bullet forward by 5px starting at 0 degree ship-angle if bullet is moved forward x1 frame", () => {
    expect(ship).toBeDefined();
    expect(ship.x).toBe(400);
    expect(bullet.updateBullet).toBeDefined();
    expect(bullet.visible).toBeTrue();
    expect(bullet.x).toBe(400);
    expect(bullet.angle).toBe(0);

    //move bullet in x-direction by 5px
    bullet.updateBullet();
    expect(bullet.x).toBe(395);
  });
  it("should move the bullet forward by 20px starting at 0 degree ship-angle if bullet is moved forward x4 frames in x-direction", () => {
    //move ship in x-direction by 4 frames
    for (let i = 0; i < 4; i++) {
      bullet.updateBullet();
    }
    expect(bullet.x).toBe(380);
  });
});

describe("test we are updating both the bullets x and y coordinates when moving in both x and y direction", () => {
  beforeEach(() => {
    ship = new Ship(); //starting at 300px in the y-direction
    bullet = new Bullet();
    bullet.angle = 45; //explicityly set the bullet.angle to 45 degrees
  });
  it("should move the bullet forward approx. 3.5px in both x and y direction starting at 45 degrees when moved forward x1 frame", () => {    expect(ship).toBeDefined();
    expect(ship).toBeDefined();
    expect(ship.x).toBe(400);
    expect(ship.y).toBe(300);
    expect(bullet.visible).toBeTrue();
    expect(bullet.angle).toBe(45);

    bullet.updateBullet();
    expect(bullet.x).toBeCloseTo(396.5, 1);
    expect(bullet.y).toBeCloseTo(296.5, 1);
  }); 
});