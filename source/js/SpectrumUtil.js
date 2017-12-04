/* Mostly for when the spectrum visualizer was active.
Calculates the top points of the different bars on the spectrum.
*/
function SpectrumUtil() {  
	this.bezel = 40;
	this.specHeight = 300;
	this.topPoint = [];
	this.lastPeak = [];
 	for(i=0; i<1024; i++){
		this.topPoint[i] = 10;
	}	
}

//returns a value that is a quantifier for the intensity of a frequency
//this is a more standard visualizer for our spectrum//
SpectrumUtil.prototype.run = function(){
	//scale(2.0);
	//noFill;
	for(i=0; i<1024; i++){
		//sData = frequencyData[i];
		this.sData = this.getSpectrumValue(i);
		//this.lineHeight = specHeight-sData;
		this.lastPeak[i] = this.sData;

		//shifts the peak points downward over time
		this.topPoint[i] -= 2;

		//draws the peak points either at a new position if there is a new peak or at their previous position
		if(this.topPoint[i] < this.lastPeak[i]){
			this.topPoint[i] = this.sData;
		}

	}
}

SpectrumUtil.prototype.peakAverage = function(){
	this.sum = 0;
	for(i=0; i<1024; i++){
		this.sum += this.topPoint[i];
	}
	return this.sum/(1024);
}

SpectrumUtil.prototype.getSpectrumValue = function(frequency) {
	return getFrequencyValue(frequency);
}