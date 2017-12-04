var lineHeight, frequencyData, sData, spacer, xpos, baseline;
//lineHeight of canvas
var specHeight = 300;
//margins of our display
var bezel = 40;
//arrays for display of peak lines
var topPoint = [];
var lastPeak = [];

function Spectrum() {  
	textSize(10);
 	for(i=0; i<1000; i++){
		topPoint[i] = 10;
	}
	
}

//returns a value that is a quantifier for the intensity of a frequency



//this is a more standard visualizer for our spectrum//
Spectrum.prototype.run = function(x,y){
	scale(2.0);
	noFill;
	for(i=0; i<1024; i++){
		//sData = frequencyData[i];
		sData = this.getSpectrumValue(i);
		lineHeight = specHeight-sData;
		height2 = specHeight -topPoint[i] + y;
		lastPeak[i] = sData;

		//shifts the peak points downward over time
		topPoint[i] -= 2;
		//draws the peak points either at a new position if there is a new peak or at their previous position
		if(topPoint[i] > lastPeak[i]){
			line(xpos,height2-bezel,xpos,(height2-bezel)+1);
		} else if(topPoint[i] < lastPeak[i]){
			topPoint[i] = sData;
			line(xpos,height2-bezel,xpos,(height2-bezel)+1);
		}
		//how much to space out the lines drawn
		spacer = i*2;
		//xpos of line to draw
		xpos = bezel+spacer;
		//xpos = bezel+i;
		//lineHeight of each line depends on canvas lineHeight and our frequencyData
		//this is necessary to get the line orientation we want
 
		//sets color of line
		stroke(0,sData,lineHeight);
		//draw line and set stroke for the peak lines
  		line(xpos, specHeight-bezel+y, xpos, lineHeight-bezel+y);
  		stroke(255,0,0);
  		//console.log(xpos+" "+sData);

	}

	//simply draws the numbers that we use to see the frequencies easier
	for(j=0; j<=1024; j+=100){
	 	noStroke();
	 	//this fills and draws the numbers at increments of 100
  		fill(250,250,250);
  		//textSize(32);
		text(j.toString(), (j*2)+bezel,specHeight-(bezel*.5)+y); 
		stroke(255);
		line((j*2)+bezel,specHeight-(bezel*.5)+y,(j*2)+bezel,specHeight-bezel+y);
 	}
}

Spectrum.prototype.peakAverage = function(){
	var sum = 0;
	var j;
	for(i=0;i<1000;i++){
		sum += topPoint[i];
	}

	return sum/(1000);
}

Spectrum.prototype.getSpectrumValue = function(frequency) {
	return getFrequencyValue(frequency);
}


//some random experiments
/*
//this one is visually appealing and adds the dimension of a line's slope as a visual element
function run(){
	for(i=0; i<frequencyData.length; i++){
		var n = i+10;
		lineHeight = specHeight-frequencyData[i]; 
		stroke(0,frequencyData[i],i);
  		line(i+10, specHeight, (i+10*(i/10))+10, lineHeight);
	}
}
*/

/*function run(){
	for(i=0; i<analyser.frequencyBinCount; i++){
		lineHeight = getSpectrumValue(i); 
  		line(i, 0, i, lineHeight);
	}
}*/
 