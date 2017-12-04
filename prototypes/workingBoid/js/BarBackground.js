
function BarBackground(){

	//Set the different color combonations
	colorMode(HSB);
	this.color1BaseSaturation = 165;
	this.color2BaseSaturation = 190;
	//this.color1 = color(150, this.color1BaseSaturation, 255);

	//dayTimeLowSun
	noStroke();
	this.dayTimeLowSun1 = color(150, this.color1BaseSaturation, 255);
	this.dayTimeLowSun2 = color(10, this.color2BaseSaturation, 255);
	//

	//daytime
	this.daytime2 = color(150, this.color1BaseSaturation-45, 255);
	this.daytime1 = color(130, this.color2BaseSaturation - 100, 255);
	//

	//underground
	this.underground1 = color(150, 0, 20);
	this.underground2 = color(190, this.color2BaseSaturation - 100, 140);
	//

	//after hours
	this.afterhours1 = color(200, 200, 120);
	this.afterhours2 = color(20, 235, 255);

	//chainsaw
	this.chainsaw1 = color(150, 0, 20);
	this.chainsaw2 = color(0, this.color2BaseSaturation, 140);

	this.color1 = this.getColor1();
	this.color2 = this.getColor2();

	
	this.satIncrease = getSizeMultiplier(400);
	this.barNum = 100;			//The number of bars drawn for the gradient
	this.barHeight = this.calculateBarHeight()+10;
	this.barHeightIncrement = 1 / this.barNum;		//out of the barNum rectangles being drawn, the Y position. Used in the forloop for drawing the rects
}

BarBackground.prototype.run = function(){
	push();
	colorMode(HSB);

	//set colorMode to HSB
	//colorMode(HSB);
	//remove stroke for the rectangles we will draw
	noStroke();
	//underground
	//this.color1 = color(150, 0, 20);
	this.color1 = this.getColor1();
	this.color2 = this.getColor2();
	//this.color2 = this.chainsaw2;
	//

	//draws rectangles
	for(i = 0; i < 1; i += this.barHeightIncrement){
		this.lerpy = lerpColor(this.color1, this.color2, i);
		//sets fill for each individual rectangle of 100
		//fill(lerpColor(this.color1, this.color2, i));
		fill(this.lerpy, 255);
		//draws the rectangle at 0,height*i with a 
		rect(0,(height*i),width,this.barHeight);
	}
	pop();
}

BarBackground.prototype.calculateBarHeight = function(){
	return height / this.barNum;

}

BarBackground.prototype.getColor1 = function(){
	if(THEME === DAYTIME_LOWSUN){
		this.color1 = this.dayTimeLowSun1;
	}else if(THEME === DAYTIME){
		this.color1 = this.daytime1;
	}else if(THEME === UNDERGROUND){
		this.color1 = this.underground1;
	}else if(THEME === AFTERHOURS){
		this.color1 = this.afterhours1;
	}else if(THEME === CHAINSAW){
		this.color1 = this.chainsaw1;
	}
	return this.color1;
}

BarBackground.prototype.getColor2 = function(){
	if(THEME === DAYTIME_LOWSUN){
		this.color2 = this.dayTimeLowSun2;
	}else if(THEME === DAYTIME){
		this.color2 = this.daytime2;
	}else if(THEME === UNDERGROUND){
		this.color2 = this.underground2;
	}else if(THEME === AFTERHOURS){
		this.color2 = this.afterhours2;
	}else if(THEME === CHAINSAW){
		this.color2 = this.chainsaw2;
	}
	return this.color2;
}