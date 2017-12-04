var cloud1;

function setup(){
  createCanvas(1920,1200);
  //cloud1 = new Cloud(0,0,6,235);
  cloudFlock = new CloudFlock(0,-1,30);
}

function draw(){
  background(255,213,122);


  cloudFlock.run();
}