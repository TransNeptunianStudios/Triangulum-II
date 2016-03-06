var Weapon = {};

Weapon.BasicBullet = function (game) {

  Phaser.Group.call(this, game, game.world, 'Basic Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 600;
  this.fireRate = 200;

  for (var i = 0; i < 64; i++) {
    var bullet = new Bullet(game, 'basic_green_bullet');
    this.add(bullet);
  } 
};

Weapon.BasicBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.BasicBullet.constructor = Weapon.BasicBullet;

Weapon.BasicBullet.prototype.fire = function (source) {

  if (this.game.time.time < this.nextFire) {
    return;
  }

  var x = source.x;
  var y = source.y - 15;

  this.nextFire = this.game.time.time + this.fireRate;

  return this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed);

};

Weapon.TargetingBullet = function (game) {

  Phaser.Group.call(this, game, game.world, 'Basic Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 600;
  this.fireRate = 1000;

  for (var i = 0; i < 64; i++) {
    this.add(new Bullet(game, 'basic_green_bullet'));
  }
};

Weapon.TargetingBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.TargetingBullet.constructor = Weapon.TargetingBullet;

Weapon.TargetingBullet.prototype.fire = function (source, target) {
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
