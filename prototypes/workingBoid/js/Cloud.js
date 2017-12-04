
//main class for creating cloud objects
//cloudsize is the number of circles we want to compose the cloud
//saturationMod is the value 0-255 used to change the background that is used in cloud renderings
//a cloud at  0,0 has its upper left region close to 0,0
function Cloud(x,y,cloudSize,saturationMod,scale){
	this.x = x;
	this.y = y;
	this.scale = scale;
	//variables for main cloud construction
	this.cloudWidth = randomMinMax(175,190)*this.scale;
	this.cloudHeight = randomMinMax(50,90)*this.scale;
	this.mainCircleRadius = this.cloudHeight;
	this.saturationMod = saturation(bgEffect.getColor1())+saturationMod;

	//variance for cloudbg
	this.structureVariance = randomMinMax(0,20);

	//alphas for diff circles
	this.alphas = [];
	for(i=0; i<cloudSize; i++){
		alpha[i] = randomMinMax(50,80);
	}
}

Cloud.prototype.run = function(){
	push();
	noStroke();
	fill(this.saturationMod-this.structureVariance);
	//left
	ellipse((this.x)+this.cloudWidth,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius,this.mainCircleRadius);
	//right
	ellipse(this.x,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius,this.mainCircleRadius);
	//topright
	ellipse(this.x+this.cloudWidth*(5/8),(this.y)+this.mainCircleRadius,this.mainCircleRadius*1.5,this.mainCircleRadius*1.5);
	//lefttop
	ellipse((this.x)+this.cloudWidth*.25,(this.y)+this.mainCircleRadius,this.mainCircleRadius,this.mainCircleRadius);
	//botleft
	ellipse((this.x)+this.cloudWidth*.37,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius*1.5*randomMinMax(.8,1),this.mainCircleRadius*1.5*randomMinMax(.8,1));
	//botright
	ellipse(this.x+this.cloudWidth*(3/4),(this.y)+this.mainCircleRadius*1.6,this.mainCircleRadius*randomMinMax(.9,1.7),this.mainCircleRadius*randomMinMax(.9,1.7));

	fill(bgEffect.getColor1(),alpha[0]);
	//left
	ellipse((this.x)+this.cloudWidth,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius,this.mainCircleRadius);
	fill(bgEffect.getColor1(),alpha[1]);
	//right
	ellipse(this.x,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius,this.mainCircleRadius);
	fill(bgEffect.getColor1(),alpha[2]);
	//topright
	ellipse(this.x+this.cloudWidth*(5/8),(this.y)+this.mainCircleRadius,this.mainCircleRadius*1.5,this.mainCircleRadius*1.5);
	fill(bgEffect.getColor1(),alpha[3]);
	//lefttop
	ellipse((this.x)+this.cloudWidth*.25,(this.y)+this.mainCircleRadius,this.mainCircleRadius,this.mainCircleRadius);
	fill(bgEffect.getColor1(),alpha[4]);
	//botleft
	ellipse((this.x)+this.cloudWidth*.37,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius*1.5*randomMinMax(.8,1),this.mainCircleRadius*1.5*randomMinMax(.8,1));
	fill(bgEffect.getColor1(),alpha[5]);
	//botright
	ellipse(this.x+this.cloudWidth*(3/4),(this.y)+this.mainCircleRadius*1.6,this.mainCircleRadius*randomMinMax(.9,1.7),this.mainCircleRadius*randomMinMax(.9,1.7));
	pop();
}