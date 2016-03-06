var Enemy = function(game, startPos, startSpeed, bulletGroup, enemyType, player) {

  // Call super class
  Phaser.Sprite.call(this, game, startPos.x, startPos.y, enemyType.spriteName);

  // Enable physics for sprite
  this.game.physics.arcade.enable(this);

  // Enemy shall be destroyd if out of world bounds.
  // Set start Y coordinate with care so that object
  // is not out of bounds when it spawns.
  this.checkWorldBounds = true;

  this.anchor.set(0.5);

  this.bulletGroup = bulletGroup;

  this.body.velocity.y = startSpeed;

  this.events.onKilled.add(function() {
    this.destroy(true);
  }, this);

  this.events.onOutOfBounds.add(function() {
    this.destroy(true);
  }, this);
 
  this.health = 5;

  this.player = player;
  this.weapon = null;


  if (typeof(enemyType.entityFunctions.init) !== 'undefined') {
    enemyType.entityFunctions.init(this);
  }

  if (typeof(enemyType.entityFunctions.update) !== 'undefined') {
    this._doUpdate = enemyType.entityFunctions.update;
  }

  if (typeof(enemyType.entityFunctions.see) !== 'undefined') {
    this._see = enemyType.entityFunctions.see;
  }

  if (typeof(enemyType.entityFunctions.hit) !== 'undefined') {
    this._doHit = enemyType.entityFunctions.hit;
  }

  if (typeof(enemyType.entityFunctions.die) !== 'undefined') {
    this._doDie = enemyType.entityFunctions.die;
  }
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
  if (typeof(this._see) !== 'undefined') {
    this._see(this.player);
  }

  if (typeof(this._doUpdate) !== 'undefined') {
    this._doUpdate(this);
  }
}

Enemy.prototype.hit = function() {

  this.health -= 1;
  this.game.sound.play('hit1', 0.3);

  if (typeof(this._doHit) !== 'undefined') {
    this._doHit(this);
  }

  if (this.health == 0) {
    this.die();
  }
}

Enemy.prototype.die = function() {
  if (this.alive) {

    this.game.sound.play('explosion1');
    this.alive = false;

    if (typeof(this._doDie) !== 'undefined') {
      this._doDie(this);
    }
  }
}