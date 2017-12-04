
//var bgEffect;
var colorBase = 240;
//frequency to mod colors with
var colorFreq1 = 570;


function BarBackground(){
	var color1,color2,barWidth,barNum;
	this.barNum = 100;
	this.barWidth = this.calculateBarWidth() + 10;
	this.color1 = color(0, 102, 40);
	this.color2 = color(120, 102, 153);
}

BarBackground.prototype.run = function(){
	//console.log(spectrum.peakAverage());
	//stroke(255,255,255);
	noStroke();
	//this.color1 = color(0,0,spectrum.peakAverage());
	//this.color2 = color(0,spectrum.peakAverage(),0);
	this.colorThis = getSizeMultiplier(colorFreq1)*6;
	if(this.colorThis>0){
		this.color1 = color(this.colorThis,0,colorBase+this.colorThis);
		this.color2 = color(0,colorBase+this.colorThis,this.colorThis);
	}else{
		this.color1 = color(0,0,colorBase);
		this.color2 = color(0,colorBase,0);
	}
	
//	fill(this.color1);
//	rect(0, 0, this.barWidth, height);

	for(i = 0; i < .99; i+=.01){
		fill(lerpColor(this.color1, this.color2, i+.01));
		rect(width*i,0,this.barWidth,height);
	}
	fill(this.color2);
	rect(width-this.barWidth, 0, this.barWidth, height);

}

BarBackground.prototype.calculateBarWidth = function(){
	return width / this.barNum;

}