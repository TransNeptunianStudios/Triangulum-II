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

    this._playerWeapons.push(new Weapon.BasicGun(this.game));

    this._elapsedMsSinceStart = 0;
    this.game.time.reset();

    this._player = new Player(this.game, {
      x: 400,
      y: 200
    }, this._playerWeapons);

    this._enemyGroup = this.game.add.group();
    this._enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this._enemyGroup.enableBody = true;

    this._bulletGroup = this.game.add.group();
    this._bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
    this._bulletGroup.enableBody = true;

    this._enemies = newLevel.slice(); // copying

    this.level = level;

    this._completed = false;
  },

  update: function() {

    if (this._enemies.length > 0) {
      if (this._enemies[0].spawn_time < this._elapsedMsSinceStart) {
        var enemies = this.factory(this._enemies.shift());
        enemies.forEach(function(enemy) {
            this._enemyGroup.add(enemy);
        }, this);
      }
    }
    else if(this._levelBoss  == null && this.level == 0)
          this._levelBoss = new Flagship(this.game, this._bulletGroup, this._player);

    // Handle player collision with enemies
    this.game.physics.arcade.overlap(this._player, this._enemyGroup, null, function(player, enemy) {
      player.hit();
      enemy.hit();
    }, this);

    // Handle enemy bullet collision with enemies
    // Doesnt work with the boss :(((((
    this.game.physics.arcade.overlap(this._enemyGroup, this._bulletGroup, null, function(enemy, bullet) {
      if(!enemy.boss){
        enemy.hit();
        bullet.hit();
      }
    }, this);

    // Handle enemy bullet collision with player
    this.game.physics.arcade.overlap(this._player, this._bulletGroup, null, function(player, bullet) {
      player.hit();
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
    var enemies = [];

    switch (enemy['type']) {
      case 'basic_asteroid':
        enemies.push(new Enemy(this.game, {
          x: enemy['start_x'],
          y: -16
        }, enemy['start_speed'], this._bulletGroup, BasicAsteroid));
        break;
      case 'enemy1':
        enemies.push(new Enemy(this.game, {
          x: enemy['start_x'],
          y: -16
        }, enemy['start_speed'], this._bulletGroup, Enemy1, this._player));
        break;
      case 'mine':
        enemies.push(new Enemy(this.game, {
          x: enemy['start_x'],
          y: -16
        }, enemy['start_speed'], this._bulletGroup, Mine, this._player));
        break;
      default:
        console.log("Factory was told to create an unknown enemy!")
    }
      return enemies;
  },
};
