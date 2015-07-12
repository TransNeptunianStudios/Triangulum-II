Triangulum.Game = function (game) {
  this.game = game;
};

Triangulum.Game.prototype = {
  create: function () {

    // Add physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.setBounds(0, 0, this.game.width, this.game.height);

    this._level = new Level(this.game);
    this._level.create(0);
  },

  update: function () {
    this._level.update();
  },
};
