var height, spectrumData;
var spacer;
var xpos;
var canvasHeight = 300;
var bezel = 40
var sData;
var topPoint = [];
var lastPeak = [];

function setup() {  
	spectrumData = new Uint8Array(analyser.frequencyBinCount);
 	analyser.getByteFrequencyData(spectrumData);
	createCanvas(spectrumData.length*4,canvasHeight*4);
 	for(i=0; i<spectrumData.length; i++){
		sData = spectrumData[i];
		topPoint[i] = sData;
	}
}
function draw() {
	scale(4.0);
 	analyser.getByteFrequencyData(spectrumData);
 	background(90);
 	run();
}
/*
//this one is visually appealing and adds the dimension of a line's slope as a visual element
function run(){
	for(i=0; i<spectrumData.length; i++){
		var n = i+10;
		height = canvasHeight-spectrumData[i]; 
		stroke(0,spectrumData[i],i);
  		line(i+10, canvasHeight, (i+10*(i/10))+10, height);
	}
}
*/

//this is a more standard visualizer for our spectrum//
function run(){
	for(i=0; i<spectrumData.length; i++){
		sData = spectrumData[i];
		lastPeak[i] = sData;
		topPoint[i] -= .1;
		if(topPoint[i] > lastPeak[i]){
			height2 = canvasHeight -topPoint[i];
			line(xpos,height2-bezel,xpos,(height2-bezel)+1);
		} else if(topPoint[i] < lastPeak[i]){
			topPoint[i] = sData;
			height2 = canvasHeight -topPoint[i];
			line(xpos,height2-bezel,xpos,(height2-bezel)+1);
		}

		spacer = i*5;
		xpos = bezel+spacer;
		height = canvasHeight-sData; 
		stroke(0,sData,height);
  		line(xpos, canvasHeight-bezel, xpos, height-bezel);
  		stroke(255,0,0);
	}

	//draw marker numbers
	for(j=0; j<spectrumData.length; j+=100){
	 	noStroke();
	 	//this fills and draws the numbers at increments of 100
  		fill(250,250,250);
		text(j.toString(), j+bezel,canvasHeight-(bezel*.5)); 
		stroke(255);
		line(j+bezel,canvasHeight-(bezel*.5),j+bezel,canvasHeight-bezel);
 	}
}

/*function run(){
	for(i=0; i<analyser.frequencyBinCount; i++){
		height = getSpectrumValue(i); 
  		line(i, 0, i, height);
	}
}*/
 