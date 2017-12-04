function BirdModel(x, y){
	//Call the Boid parent constructor
	Boid.call(this, x, y);

	//BirdModel specific variables
	this.wingState = new WingStates();
	this.baseScale = random(.05, .1);
	this.offCanvasAmount = 400;  //how far in X direction the model goes off canvas when reset or before hitting X bounds	
	this.initialPosition = createVector(x,y);
	this.myFrequency = random(100, 300);

	//Set up colors
	push();
	colorMode(HSB);
	this.hueValue = random(0, 255);
	this.baseSaturation = 180;
	this.baseBrightness = 230;
	this.bodyColor = color(this.hueValue, this.baseSaturation, this.baseBrightness);
	this.headColor = color(this.hueValue, this.baseSaturation, this.baseBrightness-20);
	this.outWingColor = color(this.hueValue, this.baseSaturation, this.baseBrightness+10);
	this.innerWingColor = color(this.hueValue, this.baseSaturation, this.baseBrightness-25);
	this.outWingHingeColor = color(this.hueValue, this.baseSaturation, this.baseBrightness-10);
	pop();

};

//Create a BirdModel.prototype object that inherits from Boid.prototype.
BirdModel.prototype = Object.create(Boid.prototype);

BirdModel.prototype.constructor = BirdModel;

//Replace the render function
BirdModel.prototype.render = function(){
	//create a new layer for the BirdModel
	push();
	translate(this.position.x, this.position.y); //move the bird to the correct position
	scale(-1, 1);			//flip it
	scale(this.scaleAmount);
	rotate(-PI/16);		//rotate the body of the bird a little bit
	this.drawBirdModel();
	pop();
}

BirdModel.prototype.drawBirdModel = function(){
	push();
	var stateOfWings = this.wingState.getWingState();

	//Head
	//var mainHeadPoint = createVector(200, 400);		//starting base for all points
	var mainHeadPoint = createVector(0, 0);				//head starts at 
	//mainHeadPoint.add(this.initialPosition);
	mainHeadPoint.add(stateOfWings[2]);
	var lowerHeadPoint = createVector(mainHeadPoint.x + 30, mainHeadPoint.y + 65);
	var beakPoint = createVector(mainHeadPoint.x - 150, mainHeadPoint.y + 120);
	
	//belly
	var bellyPoint = createVector(mainHeadPoint.x + 150, mainHeadPoint.y + 350);	//bottom belly corner of bottom
	var bellyPoint2 = createVector(bellyPoint.x + 250, bellyPoint.y);
	
	//tail
	var tailPoint = createVector(mainHeadPoint.x + 800, bellyPoint.y);
	var outTailTip = createVector(tailPoint.x + 100, tailPoint.y - 70);
	var innerTailTip = createVector(outTailTip.x - 50, outTailTip.y - 50);
	var tailBase = createVector(tailPoint.x - 30, tailPoint.y - 12);

	//wing hinges
	var outWingHinge1 = createVector(mainHeadPoint.x + 200, mainHeadPoint.y + 60);	//closer to head
	var outWingHinge2 = createVector(bellyPoint2.x - 10, outWingHinge1.y + 75);		//closer to tail
	var innerWingHinge1 = createVector(outWingHinge1.x-30, outWingHinge1.y-20); //closer to head
	var innerWingHinge2 = createVector(outWingHinge2.x-15, outWingHinge2.y);	//closer to tail
	
	//wing tips
	var innerWingTip = stateOfWings[0];
	//innerWingTip.add(this.initialPosition);
	var outWingTip = stateOfWings[1];
	//outWingTip.add(this.initialPosition);


	//inner wing
	fill(this.innerWingColor);
	beginShape();
		vertex(innerWingTip.x, innerWingTip.y);
		vertex(innerWingHinge1.x, innerWingHinge1.y);
  		vertex(innerWingHinge2.x, innerWingHinge2.y);
  	endShape(CLOSE);
	//inner winge hinge
	fill(this.headColor);
	beginShape();
		vertex(bellyPoint.x, bellyPoint.y);
  		vertex(innerWingHinge1.x, innerWingHinge1.y);
  		vertex(innerWingHinge2.x, innerWingHinge2.y);
  		vertex(bellyPoint2.x, bellyPoint2.y);
	endShape(CLOSE);

  	//body
  	fill(this.bodyColor);
  	beginShape();
  		vertex(mainHeadPoint.x, mainHeadPoint.y);
  		vertex(bellyPoint.x, bellyPoint.y);
  		vertex(tailPoint.x, tailPoint.y);
  	endShape(CLOSE);
  	//head
  	fill(this.headColor);
  	beginShape();
  		vertex(mainHeadPoint.x, mainHeadPoint.y);
  		vertex(beakPoint.x, beakPoint.y);
  		vertex(lowerHeadPoint.x, lowerHeadPoint.y);
  	endShape(CLOSE);
  	//outer wing hinge
  	fill(this.outWingHingeColor);
  	beginShape(QUADS); 		//torso of wing
  		vertex(bellyPoint.x, bellyPoint.y);
  		vertex(outWingHinge1.x, outWingHinge1.y);
  		vertex(outWingHinge2.x, outWingHinge2.y);
  		vertex(bellyPoint2.x, bellyPoint2.y);
  	endShape(CLOSE);
  	//outer wing
  	fill(this.outWingColor);
  	beginShape();
  		vertex(outWingTip.x, outWingTip.y);
  		vertex(outWingHinge1.x, outWingHinge1.y);
  		vertex(outWingHinge2.x, outWingHinge2.y);
  	endShape(CLOSE);
  	//inner tail
  	fill(this.headColor);
  	beginShape();
  		vertex(innerTailTip.x, innerTailTip.y);
  		vertex(tailBase.x, tailBase.y);
  		vertex(tailPoint.x, tailPoint.y);
  	endShape(CLOSE);
  	//outter tail
  	fill(this.outWingColor);
  	beginShape();
  		vertex(outTailTip.x, outTailTip.y);
  		vertex(tailBase.x, tailBase.y);
  		vertex(tailPoint.x, tailPoint.y);
  	endShape(CLOSE);
  	pop();
}

//Controls the Wing state of the BirdModel.
function WingStates(){
	this.stateCounter = 2;			//keeps track of what state the wings are in
	this.subStateCounter = 0;		//used to count how many times getWingState is called before actually switch the state of the wings
	this.lengthOfAWingState = random(100, 130);	//number of times getWingState is called before changing state. Effectively the speed of the wing flaps
	this.direction = 1;				//what is added to wing state to change states. can be negative to cycle in reverse
	this.states = new Array(6);		//[x][0] is inner wing and [x][1] is outer wing
	for(var i = 0; i < this.states.length; i++){	//make second demension of array
		this.states[i] = new Array(3);
	}
	
	//Wings pointing upwards
	this.states[0][0] = createVector(270, -400);	//inner wing tip
	this.states[0][1] = createVector(500, -400);	//outer wing tip
	this.states[0][2] = createVector(0, 0);		//how much to raise the mainHeadPoint of the bird

	this.states[1][0] = createVector(70, -350);	
	this.states[1][1] = createVector(800, -200);
	this.states[1][2] = createVector(0, 0);

	this.states[2][0] = createVector(0, -250);	
	this.states[2][1] = createVector(870, -100);
	this.states[2][2] = createVector(0, 0);

	this.states[3][0] = createVector(-120, 190);	
	this.states[3][1] = createVector(450, 550);
	this.states[0][2] = createVector(0, -10);

	this.states[4][0] = createVector(-50, 425);	//inner wing;
	this.states[4][1] = createVector(450, 550);
	this.states[4][2] = createVector(0, -20);

	this.states[5][0] = createVector(0, 600);	//inner wing;
	this.states[5][1] = createVector(280, 700);
	this.states[5][2] = createVector(0, -30);
}

//Each time this is called it changes the state of the Wing
//If the counter of the state goes above the number of states,
//changes the directions of the wings
WingStates.prototype.getWingState = function(){
	this.subStateCounter++;
	if(this.subStateCounter >= this.lengthOfAWingState){
		this.subStateCounter == 0;			//reset the subStateCounter
		this.stateCounter += this.direction;
	}
	

	
	if(this.stateCounter >= this.states.length){
		this.direction = -1;		//switch directions
		this.stateCounter += this.direction;
	}else if(this.stateCounter < 0){
		this.direction = 1;
		this.stateCounter += this.direction;
	}

	return this.states[this.stateCounter];;
}