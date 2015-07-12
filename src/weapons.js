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
	this.reset(x, y);
	this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
	this.angle = angle;
	this.game.sound.play('basic_weapon');
};

Bullet.prototype.update = function () {};

var Weapon = {};

Weapon.BasicBullet = function (game) {

	Phaser.Group.call(this, game, game.world, 'Basic Bullet', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 200;

	for (var i = 0; i < 64; i++) {
		this.add(new Bullet(game, 'basic_green_bullet'));
	}

	return this;
};

Weapon.BasicBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.BasicBullet.constructor = Weapon.BasicBullet;

Weapon.BasicBullet.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) {
		return;
	}

	var x = source.x;
	var y = source.y - 15;

	this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed);

	this.nextFire = this.game.time.time + this.fireRate;
};
