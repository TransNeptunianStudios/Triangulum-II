var BeamWeapon = function (game, key) {

  Phaser.Sprite.call(this, game, 0, 0, key);

  this.anchor.set(0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;
};

BeamWeapon.prototype = Object.create(Phaser.Sprite.prototype);
BeamWeapon.prototype.constructor = BeamWeapon;

BeamWeapon.prototype.fire = function (x, y, angle, speed) {
  if(y < 0)
    return null;

  this.reset(x, y);
  this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
  this.angle = angle;
  this.game.sound.play('basic_weapon');

  return this;
};

BeamWeapon.prototype.hit = function () {
};

BeamWeapon.prototype.update = function () {};
