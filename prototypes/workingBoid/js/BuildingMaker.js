function BuildingMaker(){
	//load images
  	this.foregroundImg = loadImage("../img/Foreground.gif");
  	this.dhHillImg = loadImage("../img/DHHill.gif");
  	this.belltowerImg = loadImage("../img/Belltower.gif");
  	this.wachoviaImg = loadImage("../img/Wachovia.gif");
  	this.pncImg = loadImage("../img/PNC.gif");
  	this.bbtImg = loadImage("../img/BBT.gif");
  	this.clarionImg = loadImage("../img/Clarion.gif");

  	//set positions for images
  	this.foregroundPos = createVector(852, 0);
  	this.dhHillPos = createVector(1620, -35);
  	this.belltowerPos = createVector(4065, -100);
  	this.wachoviaPos = createVector(4900, 0);
  	this.pncPos = createVector(5775, 0);
  	this.bbtPos = createVector(6400, 0);
  	this.clarionPos = createVector(5400, 0);

  	this.radioBlinker = new RadioBlinker(this.dhHillPos);
}

BuildingMaker.prototype.runForeground = function() {
	image(this.foregroundImg, this.foregroundPos.x, this.foregroundPos.y);
}

//Buildings that are rendered behind the Boids
BuildingMaker.prototype.runBackBuildings = function(){
	this.dhHillWindows();
	image(this.dhHillImg, this.dhHillPos.x, this.dhHillPos.y);
	this.radioBlinker.run();

  	image(this.belltowerImg, this.belltowerPos.x, this.belltowerPos.y);

  	this.clarionWindows();
  	image(this.clarionImg, this.clarionPos.x, this.clarionPos.y);
}

//Buildings that are rendered infront of Boids
BuildingMaker.prototype.runFrontBuildings = function(){
	this.wachoviaWindows();
	image(this.wachoviaImg, this.wachoviaPos.x, this.wachoviaPos.y);

  	this.pncWindows();
  	image(this.pncImg, this.pncPos.x, this.pncPos.y);

  	this.bbtWindows();
  	image(this.bbtImg, this.bbtPos.x, this.bbtPos.y);	
}

BuildingMaker.prototype.dhHillWindows = function(){
	var backPos1 = createVector(this.dhHillPos.x + 400, this.dhHillPos.y +  1625);	//corners of window background
	var backPos2 = createVector(this.dhHillPos.x + 1180, this.dhHillPos.y + 2125);
	var windowSizer = map(getFrequencyValue(100), 0, 255, 0, 550);		//maps the frequency value to the min/max size of the window filler
	
	push();
		rectMode(CORNERS);		//makes rect function into (x1, y1, x2, y2) for top left and bottom right corner
		fill(0);
		rect(backPos1.x, backPos1.y, backPos2.x, backPos2.y);
		fill(255);
		rect(backPos1.x, backPos2.y - windowSizer, backPos2.x, backPos2.y);
	pop();
}

BuildingMaker.prototype.wachoviaWindows = function(){
	var backPos1 = createVector(this.wachoviaPos.x + 25, this.wachoviaPos.y +  1450);	//corners of window background
	var backPos2 = createVector(this.wachoviaPos.x + 480, this.wachoviaPos.y + 2125);
	var windowSizer = map(getFrequencyValue(350), 0, 255, 0, 675);
	
	push();
		rectMode(CORNERS);		//makes rect function into (x1, y1, x2, y2) for top left and bottom right corner
		fill(0);
		rect(backPos1.x, backPos1.y, backPos2.x, backPos2.y);
		fill(255);
		rect(backPos1.x, backPos2.y - windowSizer, backPos2.x, backPos2.y);
	pop();
}

BuildingMaker.prototype.clarionWindows = function(){
	var backPos1 = createVector(this.clarionPos.x + 65, this.clarionPos.y +  1750);	//corners of window background
	var backPos2 = createVector(this.clarionPos.x + 295, this.clarionPos.y + 2050);
	var windowSizer = map(getFrequencyValue(500), 0, 255, 0, 375)

	push();
		rectMode(CORNERS);		//makes rect function into (x1, y1, x2, y2) for top left and bottom right corner
		fill(0);
		rect(backPos1.x, backPos1.y, backPos2.x, backPos2.y);
		fill(255);
		rect(backPos1.x, backPos2.y - windowSizer, backPos2.x, backPos2.y);
	pop();
}

BuildingMaker.prototype.pncWindows = function(){
	var backPos1 = createVector(this.pncPos.x + 65, this.pncPos.y +  1470);	//corners of window background
	var backPos2 = createVector(this.pncPos.x + 425, this.pncPos.y + 1800);
	var windowSizer = map(getFrequencyValue(650), 0, 255, 0, 330);

	push();
		rectMode(CORNERS);		//makes rect function into (x1, y1, x2, y2) for top left and bottom right corner
		fill(0);
		rect(backPos1.x, backPos1.y, backPos2.x, backPos2.y);
		fill(255);
		rect(backPos1.x, backPos2.y - windowSizer, backPos2.x, backPos2.y);
	pop();
}

BuildingMaker.prototype.bbtWindows = function(){
	var backPos1 = createVector(this.bbtPos.x + 205, this.bbtPos.y +  1460);	//corners of window background
	var backPos2 = createVector(this.bbtPos.x + 330, this.bbtPos.y + 2000);
	var windowSizer = map(getFrequencyValue(900), 0, 255, 0, 540);

	push();
		rectMode(CORNERS);		//makes rect function into (x1, y1, x2, y2) for top left and bottom right corner
		fill(0);
		rect(backPos1.x, backPos1.y, backPos2.x, backPos2.y);
		fill(255);
		rect(backPos1.x, backPos2.y - windowSizer, backPos2.x, backPos2.y);
	pop();
}


function RadioBlinker(dhHillPos){
	this.blinkPos = createVector(dhHillPos.x, dhHillPos.y);
	this.blinkPos.add(678, 1010);
	this.alpha = 0;
	this.maxAlpha= 255;
	this.direction = 5;
}

RadioBlinker.prototype.run = function(){
	push();
		this.alpha += this.direction;
		if(this.alpha >= this.maxAlpha){
			this.direction = -5;
		}else if(this.alpha <= 0){
			this.direction = 5;
		}

		noStroke();
		fill(255, 0, 0, this.alpha);
		ellipse(this.blinkPos.x, this.blinkPos.y, 40, 40);
	pop();
}