Triangulum.Game = function (game) {
  this.game = game;
};

Triangulum.Game.prototype = {
  init: function() {
    this._level = new Level(this.game);
    this._level.create(0);
  },

  create: function () {
    // Add physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.setBounds(0, 0, this.game.width, this.game.height);
  },

  update: function () {
    this._level.update();

    if(this._level.completed)
		  this.state.start('Menu');

  },
};
