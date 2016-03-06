
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
      sprite.weapon = new Weapon.TargetingBullet(sprite.game);
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
