var Player = function(game, startPos, weapons) {

  // Call super class
  Phaser.Sprite.call(this, game, startPos.x, startPos.y, 'ship');

  this.anchor.set(0.5);

  // Event to dispatch when shooting
  this._weapons = weapons;

  // Add sprite to game
  this.game.add.existing(this);

  // Enable physics for sprite
  this.game.physics.arcade.enable(this);

  // The player shall collide with world bounds
  this.body.collideWorldBounds = true;

  // Add animations
  this.animations.add('idle', [0, 1]);

  // Start default animation
  this.animations.play('idle', 4, true);

  // Set player health
  this.health = 10;

  // Keys for checking if any key is being pressed
  this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
  this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  this.finger1 = game.input.pointer1;
  this.finger2 = game.input.pointer2;

  // Boolean for if player just has been hit. Player shall not take damage
  // for some time after being hit.
  this._isHit = false;

  // No damge taken for 3 seconds after being hit
  this._secondsAfterHit = Phaser.Timer.SECOND*3;

  // Time for when it is ok to fire next bullet
  this._bulletTime = 0;

  // Minimum time between bullets
  this._minTimeBetweenBullets = 500;

  this._currentWeapon = 0;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  // Check left/right speed (X-axis)
  if (this.leftKey.isDown) {
    this.body.velocity.x = -200;
  }
  else if (this.rightKey.isDown) {
    this.body.velocity.x = 200;
  }
  else {
    this.body.velocity.x = 0;
  }

  // Check up/down speed (Y-axis)
  if (this.upKey.isDown) {
    this.body.velocity.y = -200;
  }
  else if (this.downKey.isDown) {
    this.body.velocity.y = 200;
  }
  else {
    this.body.velocity.y = 0;
  }

  if (this.spaceKey.isDown || (this.finger1.isDown && this.finger2.isDown)) {
    this._weapons[this._currentWeapon].fire(this);
  }
}

Player.prototype.hit = function() {

  if (this._isHit) {
    // If we are hit, quick return!
    return;
  }

  this.health -= 1;
  if (this.health == 0) {
    this.kill();
    this.game.sound.play('explosion1');
  }
  else {
    this._isHit = true;
    this.game.time.events.add(this._secondsAfterHit, function() { this._isHit = false; }, this);
    this.game.sound.play('hit1');

    // Hurt/invincible-"animation", removes itself when done
    this.game.add.tween(this).to( { alpha: 0 }, this._secondsAfterHit/20, "Linear", true, 0, 10, true);
  }
}
