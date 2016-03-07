var Bullet = function (game, key) {

  Phaser.Sprite.call(this, game, 0, 0, key);

  this.anchor.set(0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed) {
  if(y < 0)
    return null;

  this.reset(x, y);
  this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
  this.angle = angle;
  this.game.sound.play('basic_weapon');

  return this;
};

Bullet.prototype.hit = function () {
  this.kill();
};

Bullet.prototype.update = function () {};

var Weapon = {};

Weapon.BasicGun = function (game) {

  Phaser.Group.call(this, game, game.world, 'Basic Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 600;
  this.fireRate = 200;

  for (var i = 0; i < 64; i++) {
    var bullet = new Bullet(game, 'basic_green_bullet');
    this.add(bullet);
  }
};

Weapon.BasicGun.prototype = Object.create(Phaser.Group.prototype);
Weapon.BasicGun.constructor = Weapon.BasicGun;

Weapon.BasicGun.prototype.fire = function (source) {

  if (this.game.time.time < this.nextFire) {
    return;
  }

  var x = source.x;
  var y = source.y - 15;

  this.nextFire = this.game.time.time + this.fireRate;

  return this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed);

};

Weapon.TargetingGun = function (game) {

  Phaser.Group.call(this, game, game.world, 'Basic Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 600;
  this.fireRate = 1000;

  for (var i = 0; i < 64; i++) {
    this.add(new Bullet(game, 'basic_green_bullet'));
  }
};

Weapon.TargetingGun.prototype = Object.create(Phaser.Group.prototype);
Weapon.TargetingGun.constructor = Weapon.TargetingGun;

Weapon.TargetingGun.prototype.fire = function (source, target) {
  this.source = source;
  if (this.game.time.time < this.nextFire) {
    return;
  }

  var angle = this.game.math.angleBetween( source.x, source.y,
                                           target.x, target.y);

  var x = source.x + (Math.cos(angle) * 20);
  var y = source.y + (Math.sin(angle) * 20);

  this.nextFire = this.game.time.time + this.fireRate;

  return this.getFirstExists(false).fire(x, y, Phaser.Math.radToDeg(angle), this.bulletSpeed);
};
