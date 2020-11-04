it("test we can create an instance of a bullet", () => {
  let angleOfShip = 90;
  let bullet = new Bullet(angleOfShip);
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


  it("should move the bullet forward by 5px starting at 90 degree ship-angle if bullet is moved forward x1 time", () => {
    expect(ship).toBeDefined();
    expect(ship.x).toBe(400);
    expect(bullet.updateBullet).toBeDefined();
    expect(bullet.visible).toBeTrue();

    //move bullet in y-direction by 5px
    bullet.updateBullet();
    expect(bullet.y).toBe(295);
  });
});
