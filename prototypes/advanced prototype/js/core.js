var frequencyData;
var nowPlayingDragger;                                //Object that drags song/artist and other info across screen              
setInterval(getStreamCount, 5000);                    //check number of streamers every 5 seconds
setInterval(getNowPlaying, 30000);                    //check now playing every 30 seconds, also starts the nowPlayingDragger

function setup(){
  createCanvas(6816,2240);
  nowPlayingDragger = new TextDragger();
  getStreamCount();
  getNowPlaying();

  frequencyData = new Uint8Array(analyser.frequencyBinCount);

  analyser.getByteFrequencyData(frequencyData);
  analyser.getByteTimeDomainData(frequencyData);

  //background
  bgEffect = new BarBackground();
  //initiate flock
  flock = new Flock();
  //spectrum utility
  spectrumUtil = new SpectrumUtil();


  //CloudFlock(yPosMin,deltaX,numClouds,scale,baseColor)
  //cloud layer 1
  cloudFlock1 = new CloudFlock(10,-.8,90,.8,220);
  //cloud layer 2
  cloudFlock2 = new CloudFlock(20,-1.5,80,.9,255);
  //static info
  //infoText = new StaticTextInfo();

}

function draw(){
  colorMode(RGB);
  analyser.getByteFrequencyData(frequencyData);
  background(255);

  //draw function calls for all objects
  bgEffect.run();
  //spectrum.run(0,800);
  cloudFlock1.run();
  flock.run();
  cloudFlock2.run();
  spectrumUtil.run();
  //infoText.run();
  //textMaker.run();
  nowPlayingDragger.run();
}