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