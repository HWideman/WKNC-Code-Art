
//main class for creating cloud objects
//cloudsize is the number of circles we want to compose the cloud
//base is the value 0-255 used for the brightest background of the cloud
//a cloud at  0,0 has its upper left region close to 0,0
function Cloud(x,y,cloudSize,baseColor,scale){
	this.x = x;
	this.y = y;
	this.scale = scale;
	//variables for main cloud construction
	this.cloudWidth = randomMinMax(175,190)*this.scale;
	this.cloudHeight = randomMinMax(50,90)*this.scale;
	this.mainCircleRadius = this.cloudHeight;
	this.baseColor = baseColor;

	//variance for cloudbg
	this.structureVariance = randomMinMax(0,30);

	//alphas for diff circles
	this.alphas = [];
	for(i=0; i<cloudSize; i++){
		alpha[i] = randomMinMax(50,80);
	}


}

Cloud.prototype.run = function(){
	noStroke();
	fill(this.baseColor-this.structureVariance);
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


	fill(0,208,255,alpha[0]);
	//left
	ellipse((this.x)+this.cloudWidth,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius,this.mainCircleRadius);
	fill(0,208,255,alpha[1]);
	//right
	ellipse(this.x,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius,this.mainCircleRadius);
	fill(0,208,255,alpha[2]);
	//topright
	ellipse(this.x+this.cloudWidth*(5/8),(this.y)+this.mainCircleRadius,this.mainCircleRadius*1.5,this.mainCircleRadius*1.5);
	fill(0,208,255,alpha[3]);
	//lefttop
	ellipse((this.x)+this.cloudWidth*.25,(this.y)+this.mainCircleRadius,this.mainCircleRadius,this.mainCircleRadius);
	fill(0,208,255,alpha[4]);
	//botleft
	ellipse((this.x)+this.cloudWidth*.37,(this.y)+this.mainCircleRadius*1.5,this.mainCircleRadius*1.5*randomMinMax(.8,1),this.mainCircleRadius*1.5*randomMinMax(.8,1));
	fill(0,208,255,alpha[5]);
	//botright
	ellipse(this.x+this.cloudWidth*(3/4),(this.y)+this.mainCircleRadius*1.6,this.mainCircleRadius*randomMinMax(.9,1.7),this.mainCircleRadius*randomMinMax(.9,1.7));
}