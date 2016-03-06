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