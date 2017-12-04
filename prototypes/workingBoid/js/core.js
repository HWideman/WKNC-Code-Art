/* The main class of the visualizer. 
Uses the P5JS preload, setup, and draw functions. 
Also sets up the intervals for regularly getting the streamers, now playing, and THEME
*/
var frequencyData;
var nowPlayingDragger;                                //Object that drags song/artist and other info across screen              
setInterval(getStreamCount, 5000);                    //check number of streamers every 5 seconds
setInterval(getNowPlaying, 30000);                    //check now playing every 30 seconds, also starts the nowPlayingDragger
setInterval(setTheme, 60000);                         //Checks and updates the THEME every minute

var infoBarImg;
var buildingMaker;
var bgEffect;

function preload(){
  getStreamCount();
  getNowPlaying();
  infoBarImg = loadImage("../img/StaticInfoBar.gif");
  buildingMaker = new BuildingMaker();      //constructor loads building images
}

function setup(){
  frameRate(30);                //usually doesn't meet the full frame rate and sits around 20fps instead
  createCanvas(6816,2240);      //size of Immersion Theater
  setTheme();

  frequencyData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencyData);
  analyser.getByteTimeDomainData(frequencyData);
  spectrumUtil = new SpectrumUtil();

  //background
  bgEffect = new BarBackground();
  //initiate flock
  flock = new Flock("BirdModel");
  //spectrum utility
  


  //CloudFlock(yPosMin,deltaX,numClouds,scale,SaturationMod)
  //cloud layer 1
  var numberCFlock1 = random(0, 40);
  var velocityCFlock1 = random(-.6, -.1);
  cloudFlock1 = new CloudFlock(0,velocityCFlock1,numberCFlock1,1,230);    //random number of clouds
  //cloud layer 2
  cloudFlock2 = new CloudFlock(15,velocityCFlock1*1.5,random(0,60),1.2,240);
  //now playing info on side bar
  textMaker = new TextMaker();
//print(bgEffect.getColor1());
}

//Gets called over and over to update the frame
//This is where all the objects' run functions are called
function draw(){
  colorMode(RGB);
  analyser.getByteFrequencyData(frequencyData);
  background(255);

  //draw function calls for all objects
  bgEffect.run();
  //spectrum.run(0,800);
  cloudFlock1.run();
  buildingMaker.runBackBuildings();
  flock.run();
  cloudFlock2.run();
  spectrumUtil.run();
  
  //nowPlayingDragger.run();
  image(infoBarImg, 0, 0);   //left info panel
  textMaker.run();
  buildingMaker.runFrontBuildings();
  buildingMaker.runForeground();
}

