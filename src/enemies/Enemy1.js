

var Enemy1 = {

  spriteName: 'enemy1',
  weaponLock: null,
  entityFunctions: {
    init: function(sprite) {
      // Add animations
      sprite.animations.add('die', [1, 3]);
      sprite.weapon = new Weapon.TargetingBullet(sprite.game);
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