// Boid class
// Methods for Separation, Cohesion, Alignment added

//////generates a random frequency for boid between (baseFrequency + - frequencyDeviance)
var baseFrequency = 100;
var frequencyDeviance = 10;
//////
// bounds //
var topBound = 200;
var bottomBound = 2000;


var Boid = function(x,y, hueValue) {
  this.hueValue = hueValue;

  this.acceleration = createVector(0,0);
  this.baseScale;    //minimum scale of Boid
  this.scaleAmount;  //current scale of Boid
  this.offCanvasAmount;       //how far the Boid goes off the canvas before reseting & where it starts off campus when it gets put back on the opposite side to wrap around

  //randomized x velocity to create variation in 
  this.velocity = createVector(randomMinMax(1,11),random(-1,1));
  this.position = createVector(x,y);
  this.maxspeed = 11;    // Maximum speed
  this.minspeed = 1;
  this.maxforce = 0.2; // Maximum steering force
};

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.posRegulation();
  this.update();
  this.borders();
  this.render();
};

//Regulates velocity vectors of boid
Boid.prototype.posRegulation = function(){
  //if the boid's velocity is too low, speed it up
  if(this.velocity.x < 2){
    this.acceleration.x += 1;
  }
  if(this.position.x > width*.25 && this.position.x < width*.3){
    var beat = spectrumUtil.peakAverage();
    this.applyForce(createVector((beat*.01),beat*.0001));
  }
  //if the boid is near the bottom or top of bounds, steer it towards a vector that is x=100 ahead of boid pos
  //and in the middle of the bounds
  if(this.position.y > bottomBound - 5 || this.position.y < topBound - 5){
    this.applyForce(this.seek(createVector(this.position.x+100,(topBound+bottomBound)/2)));
  }
};

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
};

// We accumulate a new acceleration each time based on separation
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids);   // Separation
  // Arbitrarily weight these forces
  sep.mult(2.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
};

// Method to update location and scale of boid
var freqSizeMultiplier;
Boid.prototype.update = function() {
  //change the size multiplier to the difference between the actual intensity of a freq and the average freq
  freqSizeMultiplier = getSizeMultiplier(this.myFrequency);
  //freqSizeMultiplier = 30;
  //keep size multiplier from being negative
  if(freqSizeMultiplier < 0){
    freqSizeMultiplier *= .5;
    if(freqSizeMultiplier < -5){
      freqSizeMultiplier = 0;
    }
  }
  //scale the boid halfway to actual for smoothing of animation
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  //update position
  this.position.add(this.velocity);
  //how much to scale the boid when rendered
  this.scaleAmount = this.baseScale + (freqSizeMultiplier * .002);
 //console.log(getBeatSpeed(200));
  // Reset accelertion to 0 each cycle 
  this.acceleration.mult(0);
};

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
};

Boid.prototype.render = function(){
  //implement in child class
}

//Blocks the boid from going below 800 and above 200
Boid.prototype.borders = function(){
  if(this.position.y <= topBound) this.velocity.y = 1;
  if(this.position.y >= bottomBound) this.velocity.y = -1 * this.velocity.y; 

  if (this.position.x < -this.r){
    this.position.x = width + 200;
  }else if(this.position.x > width + 200){
    this.position.x = -200;
  } 
};


// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 50.0;
  var steer = createVector(0,0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position,boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
};
