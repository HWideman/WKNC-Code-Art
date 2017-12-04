//var flockSize = randomMinMax(50, 100);
var flockSize = 120;
console.log(flockSize);

var flock;
var frequencyData;

var text;
var upperBounds = 200;
var lowerBounds = 800;
var boundDeviancy = 200;


function setup() {
  createCanvas(6816,2240);
  
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);


  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < flockSize; i++) {
    //variate xSpawnPos more

    var b = new Boid(random(0,1000), random(200,800));
    flock.addBoid(b);
  }
}

function draw() {
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);

  background(51);
  flock.run();
  MagicalBorderLines();
}

function borderLines(){  
  line(0, 200, width, 200);
  stroke(20);
  line(0, 800, width, 800);

}
var i = 0;
var k = boundDeviancy;
function MagicalBorderLines(){
    if(i<=boundDeviancy && k<0){
      k++;
      i = i-1;
    }else if(i <= boundDeviancy && k>0){
      i=i+1;
      k--;
    }
    if(k==0){
      var j;
      i=boundDeviancy;
      k=0;
    }

  stroke(20);

  line(0, lowerBounds, width, lowerBounds+i);
  stroke(20);
  //console.log("i "+i +" k "+k);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
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

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

