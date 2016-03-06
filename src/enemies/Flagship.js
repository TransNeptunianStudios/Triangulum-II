var Flagship = {

    spriteName: 'flagship',

    entityFunctions: {
        init: function (sprite) {
            // Add animations
            sprite.animations.add('die', [1, 1]);
            sprite.health = 15;
            sprite.boss = true;
        },

        update: function (sprite) {
            if (this.y > 64)
                this.body.velocity.y = 0;

            if (this.leftTurret)
                this.leftTurret.body.velocity = this.body.velocity;
            if (this.rightTurret)
                this.rightTurret.body.velocity = this.body.velocity;
        },

        see: function (player) { },

        die: function (sprite) {
            sprite.animations.play('die', 3, false, true);
        }
    }
};
