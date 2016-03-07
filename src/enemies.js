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
  weaponLock: null,
  entityFunctions: {
    init: function(sprite) {
      // Add animations
      sprite.animations.add('die', [1, 3]);
      sprite.weapon = new Weapon.TargetingGun(sprite.game);
    },

    update: function(sprite) {
      if (sprite.weapon != null && sprite.weaponLock != null)
        var bullet = sprite.weapon.fire(this, sprite.weaponLock);
      if (bullet != null)
        sprite.bulletGroup.add(bullet);
    },

    see: function(player) {
      this.weaponLock = player.position;
    },

    die: function(sprite) {
      sprite.weapon = null;
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

    see: function(player) {
      var dist = Phaser.Math.distance(player.x, player.y, this.x, this.y);
      if (dist < 100 && this.alive) {
        player.hit();
        this.die();
      }
    },

    die: function(sprite) {
      sprite.animations.play('die', 3, false, true);
    }
  }
};

// Boilerplate design pattern!
var LeftTurret = {

  spriteName: 'turretHub',

  entityFunctions: {
    init: function(sprite) {
      sprite.events.onOutOfBounds.removeAll();

      // Add animations
      sprite.animations.add('die', [1, 1]);
      sprite.health = 5;
      sprite.weapon = new Weapon.TargetingGun(sprite.game);
    },

    update: function(sprite) {
      var bullet;
      var angle = this.game.math.angleBetween( this.x, this.y, this.weaponLock.x, this.weaponLock.y);

      if (sprite.weapon != null && sprite.weaponLock != null
      && (angle > -Math.PI/2 && angle > Math.PI/2))
        bullet = sprite.weapon.fire(this, sprite.weaponLock);

      if (bullet != null)
        sprite.bulletGroup.add(bullet);
    },

    see: function(player) {
      this.weaponLock = player.position;
    },

    die: function(sprite) {
      sprite.animations.play('die', 3, false, true);
    }
  }
};

// Boilerplate design pattern!
var RightTurret = {

  spriteName: 'turretHub',

  entityFunctions: {
    init: function(sprite) {
      sprite.events.onOutOfBounds.removeAll();

      // Add animations
      sprite.animations.add('die', [1, 1]);
      sprite.scale.x = -1
      sprite.health = 5;
      sprite.weapon = new Weapon.TargetingGun(sprite.game);
    },

    update: function(sprite) {
      var bullet;
      var angle = this.game.math.angleBetween( this.x, this.y, this.weaponLock.x, this.weaponLock.y);
      console.log(angle);
      if (sprite.weapon != null && sprite.weaponLock != null
      && (angle > -Math.PI/2 && angle < Math.PI/2))
        bullet = sprite.weapon.fire(this, sprite.weaponLock);

      if (bullet != null)
        sprite.bulletGroup.add(bullet);
    },

    see: function(player) {
      this.weaponLock = player.position;
    },

    die: function(sprite) {
      sprite.animations.play('die', 3, false, true);
    }
  }
};

var Flagship = {

  spriteName: 'flagship',

  entityFunctions: {
    init: function(sprite) {
      // Add animations
      sprite.animations.add('die', [1, 1]);
      sprite.health = 15;
      sprite.boss = true;
    },

    update: function(sprite) {
      if(this.y > 64)
        this.body.velocity.y = 0;

      if(this.leftTurret)
        this.leftTurret.body.velocity = this.body.velocity;
      if(this.rightTurret)
        this.rightTurret.body.velocity = this.body.velocity;
      },

    see: function(player) {},

    die: function(sprite) {
      sprite.animations.play('die', 3, false, true);
    }
  }
};
