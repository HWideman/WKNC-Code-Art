function BarBackground(){

	//Set the different color combonations
	colorMode(HSB);
	this.duskColor1 = color(150, 175, 255);		//blueish
	this.duskColor2 = color(10, 200, 255);		//orangeish
	colorMode(RGB);

	this.barNum = 100;			//The number of bars drawn for the gradient
	this.barHeight = this.calculateBarHeight()+10;
	this.barHeightIncrement = 1 / this.barNum;		//out of the barNum rectangles being drawn, the Y position. Used in the forloop for drawing the rects
}

BarBackground.prototype.run = function(){
	push();
	//set colorMode to HSB
	//colorMode(HSB);
	//remove stroke for the rectangles we will draw
	noStroke();
	//set color1
	this.color1 = this.duskColor1;
	//set color2
	this.color2 = this.duskColor2;

	//draws rectangles
	for(i = 0; i < 1; i += this.barHeightIncrement){
		this.lerpy = lerpColor(this.color1, this.color2, i);
		//sets fill for each individual rectangle of 100
		//fill(lerpColor(this.color1, this.color2, i));
		fill(this.lerpy);
		//draws the rectangle at 0,height*i with a 
		rect(0,(height*i),width,this.barHeight);
	}
	pop();
}

BarBackground.prototype.calculateBarHeight = function(){
	return height / this.barNum;

}