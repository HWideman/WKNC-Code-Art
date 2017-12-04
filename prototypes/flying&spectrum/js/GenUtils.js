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
/////
//returns an average of the intensity of a given frequency
var avg = 0;
var count = 0;
var freqData = 0;
function getValueAverage(frequency) {
  	count++;
  	freqData += getFrequencyValue(frequency);
	avg = (freqData/count);
	return avg;
}

//returns size multiplier value for boid based on given frequency
//if actual frequency at the time is larger than the average value, we scale our object up
function getSizeMultiplier(frequency){
	return getFrequencyValue(frequency) - getValueAverage(frequency);
}


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
