//var flockSize = randomMinMax(50, 100);
//var flockSize = 40;
//console.log(flockSize);
var flock;
var upperBounds = 200;
var lowerBounds = 800;
var boundDeviancy = 200;

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  this.flockSize = 0;
  if(listenerCount)
    this.flockSize = listenerCount;
  this.boids = [];    // An array for all the boids
  this.checkBoidCount();
}

Flock.prototype.run = function() {
  this.checkBoidCount();
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
    //velocity readout for debug purposes
  //console.log("beat: "+Math.round(getBeatSpeed(200) * 100) / 100 + " x: "+Math.round(this.boids[1].velocity.x * 100) / 100
  //+ " y: "+Math.round(this.boids[1].velocity.y * 100) / 100);
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

Flock.prototype.removeBoid = function(){
  this.boids.pop();
}

/*Checks that the number of Boids in the flock
is equal to the number of current listeners. 
Adds or removes Boids to the flock respectively.
*/
Flock.prototype.checkBoidCount = function(){
  if(this.flockSize < listenerCount){
    var difference = listenerCount - this.flockSize;
    for (var i = 0; i < difference; i++) {
      var b = new Boid(random(0,1000), random(200,800));
      this.addBoid(b);
    }
    this.flockSize = listenerCount;   //update flockSize
          
  }else if(this.flockSize > listenerCount){
    var difference = this.flockSize - listenerCount;
    for (var i = 0; i < difference; i++) {
      this.removeBoid();
    }
    this.flockSize = listenerCount;   //update flockSize
  }
}



