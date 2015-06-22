// Enemies our player must avoid
var Enemy = function(x,y,direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.spriteReverse = 'images/enemy-bug2.png';
	this.direction = direction;
    this.x=x;
    this.y=y;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   
	// Move Bugs based on Direction they are coming from...
	// reset Bugs when they go off the screen
	// Random function could be used to make game harder as score goes up
	switch(this.direction) {
		case 0:
			if(this.x < 505){
				this.x += (200*dt);
			}
			else {
				this.x = Math.floor((Math.random() * 200) - 200);
			}
			break;
		case 1:
			if(this.x > -100){
				this.x -= (200*dt);
			}
			else {
				this.x = Math.floor((Math.random() * 200) + 600);
			}
			break;
	}
	
 
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	// depending on direction load correct sprite
	switch(this.direction) {
		case 0:
			ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		break;
		case 1:
			ctx.drawImage(Resources.get(this.spriteReverse), this.x, this.y);
		break;
	}
};





    var Player=function(x,y){
        this.sprite = 'images/char-boy.png';
        this.x=x;
        this.y=y;
		// keep points... a tally of times to the finish or deaths
		this.deaths = 1;
		this.score = 1;
    };
        Player.prototype.update = function(){            
            //Iterating for enemies with conditions that are dangerous to my player.                   
                  for(var enemy in allEnemies){
                     if (allEnemies[enemy].x + 99 > this.x + 15 && allEnemies[enemy].x < this.x + 85 && allEnemies[enemy].y === this.y ) {
						console.log('Collision Detected: ' + this.deaths);
						var deathcountDiv = document.getElementById('deathcount');
						deathcountDiv.innerHTML = this.deaths;
						this.deaths++;
                        this.reset();
                      }
                  }

            //A condition to reset the player if they reach the water.

            if(this.y === -10){
				console.log('You Win!!!'+ this.score);
				var scorecountDiv = document.getElementById('scorecount');
				scorecountDiv.innerHTML = this.score;
				this.score++;
                this.reset();
            }            
        };

        Player.prototype.render = function(){
		
		
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    };
    //Set up if statements to respond to key presses 
    //and set conditions to keep the player on the board.
        Player.prototype.handleInput = function(key){
			// console.log("this.x / this.y: ", this.x, this.y);
            if(key == 'left' && this.x > 0){                
                this.x -= 100;
            }
            else if(key == 'up' && this.y> -10){
                this.y -=80;
            }
            else if(key == 'right' && this.x < 400){
                this.x += 100; 
            }
            else if(key == 'down' && this.y < 390){                
                this.y += 80;
            }
        };
        Player.prototype.reset= function(){
        //resets the players position data to start back at the beginning.

            this.x=200;
            this.y=390;
        };
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    enemy1 = new Enemy(-450,230,0);
    enemy2 = new Enemy(-200,150,1);
    enemy3 = new Enemy(-100,70,0);
    allEnemies=[enemy1,enemy2,enemy3];

    var player = new Player(200, 390);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});