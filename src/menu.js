Triangulum.Menu = function(game){

};

Triangulum.Menu.prototype = {
	create: function(){
	    
        var text = "Triangulum II";
		var style = { font: "30px Arial", fill: "#FFFFFF", align: "center" };
		var startText = this.game.add.text(Triangulum.WIDTH/2, 195, text, style);
		startText.anchor.setTo(0.5, 0);

		this.game.input.onDown.add(this.startGame, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startGame, this);
	},
	
    startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
