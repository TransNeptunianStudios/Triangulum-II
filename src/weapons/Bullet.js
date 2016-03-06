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