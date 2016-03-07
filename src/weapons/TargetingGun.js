var Weapon = {};

Weapon.TargetingGun = function (game) {

  Phaser.Group.call(this, game, game.world, 'Basic Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 500;
  this.fireRate = 700;

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
