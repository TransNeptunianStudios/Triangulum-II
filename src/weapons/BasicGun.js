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
