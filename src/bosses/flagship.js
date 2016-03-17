var Flagship = function(game, player) {

  Phaser.Group.call(this, game);


  // create flagship base
  this.hull = this.create(400, -300, 'flagship');
  this.hull.anchor.set(0.5, 0);
  game.physics.arcade.enable(this.hull);
  this.hull.body.collideWorldBounds = false;
  this.hull.health = 15;

  /*this.events.onKilled.add(function() {
    this.destroy(true);
  }, this);*/

  this.phases = {Intro : 0, FirstHalf : 1, SecondHalf : 2, Death : 3};
  this.phase = this.phases.Intro;

  this.boss = true;
}


Flagship.prototype = Object.create(Phaser.Group.prototype);
Flagship.prototype.constructor = Flagship;

Flagship.prototype.update = function() {

  // set state
  if(this.hull.body.position.y > -100)
    this.phase = this.phases.FirstHalf;

  console.log(this.hull.body.position);

  switch (this.phase) {
    case this.phases.Intro:
        this.hull.body.velocity.y = 20;
      break;
    case this.phases.FirstHalf:
        this.hull.body.velocity.y = 0;
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
