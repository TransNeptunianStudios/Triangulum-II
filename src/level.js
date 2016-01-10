
var Level = function(game) {
  this.game = game;
  this._player = null;
  this._enemies = null;
  this._playerWeapons = [];
}

Level.prototype = {
  create: function(level) {

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(0, 10);

    this._playerWeapons.push(new Weapon.BasicBullet(this.game));

    this._elapsedMsSinceStart = 0;

    this._player = new Player(this.game, {x: 400, y: 200}, this._playerWeapons);

    this._enemyGroup = this.game.add.group();
    this._enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this._enemyGroup.enableBody = true;

    this._enemies = [
      {'spawn_time': 1000.0, 'start_x': 400, 'start_speed': 20, 'type': 'basic_asteroid'},
      {'spawn_time': 2000.0, 'start_x': 200, 'start_speed': 20, 'type': 'enemy1'}
    ];
  },

  update: function() {

    if (this._enemies.length > 0) {
      if (this._enemies[0].spawn_time < this._elapsedMsSinceStart) {
        this._enemyGroup.add(this.factory(this._enemies.shift()));
      }
    }

    // Handle player collision with enemies
    this.game.physics.arcade.overlap(this._player, this._enemyGroup, null, function(player, enemy) {
      player.hit();
    }, this);

    // Handle player bullet's collision with enemies
    for (var i = 0; i < this._playerWeapons.length; i++) {
      this._playerWeapons[i].forEachExists(function(bullet) {
        bullet.game.physics.arcade.overlap(bullet, this._enemyGroup, null, function(bull, enemy) {
          if (enemy.alive) {
            bull.kill();
          }

          enemy.hit();

        }, this);
      }, this);
    }

    // Update elapsed milliseconds since start of level
    this._elapsedMsSinceStart += this.game.time.physicsElapsedMS;
  },

  factory: function(enemy) {
    switch (enemy['type']) {
      case 'basic_asteroid':
        return new Enemy(this.game, {x: enemy['start_x'], y: -16}, enemy['start_speed'], BasicAsteroid);
        break;
      case 'enemy1':
        return new Enemy(this.game, {x: enemy['start_x'], y: -16}, enemy['start_speed'], Enemy1);
        break;
      default:

    }
  },
};
