var Level = function(game) {
  this.game = game;
  this._player = null;
  this._enemies = null;
  this._playerWeapons = [];
  this._levelBoss = null;
}

Level.prototype = {
  create: function(level, boss) {

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(0, 10);

    this._playerWeapons.push(new Weapon.BasicBullet(this.game));

    this._elapsedMsSinceStart = 0;
    this.game.time.reset();

    this._player = new Player(this.game, {
      x: 400,
      y: 200
    }, this._playerWeapons);

    this._enemyGroup = this.game.add.group();
    this._enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this._enemyGroup.enableBody = true;

    this._enemies = newLevel.slice(); // copying

    // super fat way to get boss spawntime from enemies...
    var bossSpawnTime = 0;
    for(e in this._enemies){
      var enemySpawnTime = this._enemies[e].spawn_time;
      if (enemySpawnTime >= bossSpawnTime)
        bossSpawnTime = enemySpawnTime + 10000;
    }

    this._enemies.push({'spawn_time': bossSpawnTime,
                  'start_x': this.game.width/2,
                  'start_speed': 20,
                  'type': boss});

    this._completed = false;
  },

  update: function() {

    if (this._enemies.length > 0) {
      if (this._enemies[0].spawn_time < this._elapsedMsSinceStart) {
        this.factory(this._enemies.shift()).addToGame();
      }
    }

    // Handle player collision with enemies
    this.game.physics.arcade.overlap(this._player, this._enemyGroup, null, function(player, enemy) {
      player.hit();
    }, this);

    // Handle player collision with enemy bullets
    this.game.physics.arcade.overlap(this._player, this._bulletGroup, null, function(player, bullet) {
      player.hit();
      bullet.hit();
    }, this);

    // Handle enemy collision with enemy bullets
    this.game.physics.arcade.overlap(this._enemyGroup, this._bulletGroup, null, function(enemy, bullet) {
      enemy.hit();
      bullet.hit();
    }, this);


    // Handle player bullet's collision with enemies
    for (var i = 0; i < this._playerWeapons.length; i++) {
      this._playerWeapons[i].forEachExists(function(bullet) {
        bullet.game.physics.arcade.overlap(bullet, this._enemyGroup, null, function(bull, enemy) {
          if (enemy.alive) {
            bull.hit();
            enemy.hit();
          }
        }, this);
      }, this);
    }

    // End level if player dead
    if (!this._player.alive) {
      this.completed = true;
      this.game.world.remove(this.background);
    }

    // Update elapsed milliseconds since start of level
    this._elapsedMsSinceStart += this.game.time.physicsElapsedMS;
  },

  factory: function(enemy) {
    switch (enemy['type']) {
      case 'basic_asteroid':
        return new Enemy(this.game, {
          x: enemy['start_x'],
          y: -16
        }, enemy['start_speed'], this._enemyGroup, BasicAsteroid);
        break;
      case 'enemy1':
        return new Enemy(this.game, {
          x: enemy['start_x'],
          y: -16
        }, enemy['start_speed'], this._enemyGroup, Enemy1, this._player);
        break;
      case 'mine':
        return new Enemy(this.game, {
          x: enemy['start_x'],
          y: -16
        }, enemy['start_speed'], this._enemyGroup, Mine, this._player);
        break;
      // Bosses
      case 'flagship':
        return new Enemy(this.game, {
          x: enemy['start_x'],
          y: -110 // get something mathy instead
        }, enemy['start_speed'], this._enemyGroup, Flagship, this._player);
        break;
      default:
        console.log("Factory was told to create an unknown enemy!")
    }
  },
};
