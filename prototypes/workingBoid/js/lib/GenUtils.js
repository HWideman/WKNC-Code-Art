/* Used for general functions that are needed across the whole system. 
*/


//Returns a random number between min and max
function randomMinMax(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}


//returns a value that is a quantifier for the intensity of a frequency
function getFrequencyValue(frequency) {
  var nyquist = context.sampleRate/2;
  var index = Math.round(frequency/nyquist * frequencyData.length);
  return frequencyData[index];
}

/////getValueAverage/////
//
//returns an average of the intensity of a given frequency
var avg = 0;
var count = 0;
var freqData = 0;
function getValueAverage(frequency) {
  	count++;
  	//freqData += getFrequencyValue(frequency);
   	freqData += frequencyData[frequency];
	avg = (freqData/count);
	return avg;
}

function getSizeMultiplier(frequency){
	return getFrequencyValue(frequency) - (spectrumUtil.peakAverage());  
	//return frequencyData[frequency] - getValueAverage(frequency);
}
/*
function arrayAverage(array){
	var sum = 0;
	var j;
	for(i=0;i<array.length;i++){
		sum += array[i];
	}
	console.log(sum);
	return sum/(array.length);
}*/

var beat = 0;
var beatAvg = 0;
var lastBeat = 0;
function getBeatSpeed(frequency){
	//beatCount+= 1;
	beat = getSizeMultiplier(frequency);
	if(Math.round(lastBeat * 100) / 100 == Math.round(beat * 100) / 100 && beat < 10){
		return -.50;
	}
	lastBeat = beat;
	if(beat > 8){
		return 1;
	}  


	//console.log(beat+"/"+getSizeMultiplier(frequency)+"="+beatAvg);
	return 0;
}

//Prints the frame rate in the top left corner
function showFrameRate(){
  push();
  stroke(255);
  fill(255);
  textSize(18);
  var rate = frameRate();
  rate = rate | 0;    //remove numbers after decimal
  rate = rate.toString();
  text("Frame rate: " + rate, 50, 50);
  pop();
}