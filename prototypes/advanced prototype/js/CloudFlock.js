//main class for creating CloudFlock objects
//deltaX = direction and change in x we want every draw cycle

function CloudFlock(yPosMin,deltaX,numClouds,scale,baseColor){
	this.baseColor = baseColor;
	this.deltaX = deltaX;
	this.yPosMin= yPosMin;
	this.numClouds = numClouds;
	this.clouds = [];
	this.scale = scale;
	//createClouds
	for(var i = 0; i < this.numClouds; i++){
		this.xStart = randomMinMax(-200,width+300);
		//y position for each cloud
		this.yAssignment = this.yPosMin + (randomMinMax(0,200));
		var b = new Cloud(this.xStart,this.yAssignment,6,this.baseColor,this.scale);
		this.addCloud(b);
	}
	
}

CloudFlock.prototype.addCloud = function(b){
	this.clouds.push(b);
}

CloudFlock.prototype.run = function(){
	for(i=0; i<this.numClouds; i++){
		this.clouds[i].x += this.deltaX; 
		this.clouds[i].run(); 

		if(this.clouds[i].x <= -300){
			this.clouds[i].x = width;
		} else 
		if(this.clouds[i].x >= width+200){
			this.clouds[i].x = 0;
		}
	}
}

