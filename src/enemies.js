var Enemy = function(game, startPos, startSpeed, enemyType) {

  // Call super class
  Phaser.Sprite.call(this, game, startPos.x, startPos.y, enemyType.spriteName);

  // Enable physics for sprite
  this.game.physics.arcade.enable(this);

  // Enemy shall be destroyd if out of world bounds.
  // Set start Y coordinate with care so that object
  // is not out of bounds when it spawns.
  this.checkWorldBounds = true;

  this.anchor.set(0.5);

  this.body.velocity.y = startSpeed;

  this.events.onKilled.add(function() { this.destroy(true); }, this);

  this.events.onOutOfBounds.add(function() { this.destroy(true); }, this);

  this.health = 5;

  if (typeof(enemyType.entityFunctions.init) !== 'undefined') {
    enemyType.entityFunctions.init(this);
  }

  if (typeof(enemyType.entityFunctions.update) !== 'undefined') {
    this._doUpdate = enemyType.entityFunctions.update;
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
    this.game.sound.play('explosion1');
    this.die();
  }
}

Enemy.prototype.die = function() {
  if (this.alive) {

    this.alive = false;

    if (typeof(this._doDie) !== 'undefined') {
      this._doDie(this);
    }
  }
}

var BasicAsteroid = {

  spriteName: 'basic_asteroid',

  entityFunctions: {
    init: function(sprite) {
      // Add animations
      sprite.animations.add('die', [1, 3]);
    },

    update: function(sprite) {
      sprite.angle += 1;
    },

    die: function(sprite) {
      sprite.animations.play('die', 3, false, true);
    }
  }
};

var Enemy1 = {

  spriteName: 'enemy1',

  entityFunctions: {
    init: function(sprite) {
      // Add animations
      sprite.animations.add('die', [1, 3]);
    },

    update: function(sprite) {

    },

    die: function(sprite) {
      sprite.animations.play('die', 3, false, true);
    }
  }
};

var Mine = {

  spriteName: 'mine',

  entityFunctions: {
    init: function(sprite) {
      // Add animations
      sprite.animations.add('die', [1, 3]);
    },

    update: function(sprite) {
      // CHeck if player is close enough to explode
    },

    die: function(sprite) {
      sprite.animations.play('die', 3, false, true);
    }
  }
};
