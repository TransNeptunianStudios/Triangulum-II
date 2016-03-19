var Flagship = function(game, player) {
  Phaser.Group.call(this, game);
  this.player = player;

  // create flagship base
  this.hull = new Enemy(game, {
    x: 400,
    y: -150
  }, 0, this, FlagshipHull, this.player);
  this.hull.body.collideWorldBounds = false;
  this.hull.health = 15;
  this.add(this.hull);

  /*this.events.onKilled.add(function() {
    this.destroy(true);
  }, this);*/

  this.phases = {
    Intro: 0,
    FirstHalf: 1,
    SecondHalf: 2,
    Death: 3
  };
  this.phase = this.phases.Intro;
}

Flagship.prototype = Object.create(Phaser.Group.prototype);
Flagship.prototype.constructor = Flagship;

Flagship.prototype.update = function() {

  // set state
  if (this.hull.body.position.y > -100) {
    this.forEach(function(item) {
      item.body.velocity.y = 0;
    }, this);
    this.phase = this.phases.FirstHalf;
  }

  switch (this.phase) {
    case this.phases.Intro:
      this.forEach(function(item) {
        item.body.velocity.y = 20;
      }, this);
      break;
    case this.phases.FirstHalf:
      var dist = this.player.position.x - this.hull.position.x;
      var maxdist = 50;
      if (dist > maxdist)
        this.forEach(function(item) {
          item.body.velocity.x = 30;
        }, this);
      else if (dist < -maxdist)
        this.forEach(function(item) {
          item.body.velocity.x = -30;
        }, this);
      else
        this.forEach(function(item) {
          item.body.velocity.x = 0;
        }, this);
      break;
    default:
      console.log("Boss Over");
  }

}

Flagship.prototype.hit = function() {

  this.hull.health -= 1;
  this.game.sound.play('hit1', 0.3);

  if (this.hull.health == 0) {
    this.die();
  }
}

Flagship.prototype.die = function() {
  console.log("Boss Died");
}
