var Flagship = {

  spriteName: 'flagship',
  weaponLock: null,

  entityFunctions: {
    init: function(sprite) {
      // Add animations
      sprite.animations.add('die', [1, 1]);
      sprite.health = 15;
      sprite.boss = true;
      sprite.weapon = new Weapon.TargetingGun(sprite.game);
      
    },

    update: function(sprite) {
      if (this.y > 64)
        this.body.velocity.y = 0;

      if (this.leftTurret)
        this.leftTurret.body.velocity = this.body.velocity;
      if (this.rightTurret)
        this.rightTurret.body.velocity = this.body.velocity;

      if (sprite.weapon != null && sprite.weaponLock != null) {
        var bullet = sprite.weapon.fire(this, sprite.weaponLock);
        if (bullet != null)
          sprite.bulletGroup.add(bullet);
      }
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
