var wingState;
function setup() {
frameRate(20);
  createCanvas(2000, 1000);
  wingState = new WingStates();
}

function draw() {
	background(255);
	console.log(mouseX + ", " + mouseY);

	var stateOfWings = wingState.getWingState();

	//Head
	var mainHeadPoint = createVector(200, 400);		//starting base for all points
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
	var outWingTip = stateOfWings[1];

	scale(.7);
	rotate(-PI/16);
	translate(0, 200);

	//inner winge hinge
	beginShape();
		vertex(bellyPoint.x, bellyPoint.y);
  		vertex(innerWingHinge1.x, innerWingHinge1.y);
  		vertex(innerWingHinge2.x, innerWingHinge2.y);
  		vertex(bellyPoint2.x, bellyPoint2.y);
	endShape(CLOSE);
	//inner wing
	beginShape();
		vertex(innerWingTip.x, innerWingTip.y);
		vertex(innerWingHinge1.x, innerWingHinge1.y);
  		vertex(innerWingHinge2.x, innerWingHinge2.y);
  	endShape(CLOSE);
  	//body
  	beginShape();
  		vertex(mainHeadPoint.x, mainHeadPoint.y);
  		vertex(bellyPoint.x, bellyPoint.y);
  		vertex(tailPoint.x, tailPoint.y);
  	endShape(CLOSE);
  	//head
  	beginShape();
  		vertex(mainHeadPoint.x, mainHeadPoint.y);
  		vertex(beakPoint.x, beakPoint.y);
  		vertex(lowerHeadPoint.x, lowerHeadPoint.y);
  	endShape(CLOSE);
  	//outer wing hinge
  	beginShape(QUADS); 		//torso of wing
  		vertex(bellyPoint.x, bellyPoint.y);
  		vertex(outWingHinge1.x, outWingHinge1.y);
  		vertex(outWingHinge2.x, outWingHinge2.y);
  		vertex(bellyPoint2.x, bellyPoint2.y);
  	endShape(CLOSE);
  	//outer wing
  	beginShape();
  		vertex(outWingTip.x, outWingTip.y);
  		vertex(outWingHinge1.x, outWingHinge1.y);
  		vertex(outWingHinge2.x, outWingHinge2.y);
  	endShape(CLOSE);
  	//inner tail
  	beginShape();
  		vertex(innerTailTip.x, innerTailTip.y);
  		vertex(tailBase.x, tailBase.y);
  		vertex(tailPoint.x, tailPoint.y);
  	endShape(CLOSE);
  	//outter tail
  	beginShape();
  		vertex(outTailTip.x, outTailTip.y);
  		vertex(tailBase.x, tailBase.y);
  		vertex(tailPoint.x, tailPoint.y);
  	endShape(CLOSE);


  	//ellipse(mainHeadPoint.x, mainHeadPoint.y, 10,10);
  	//ellipse(lowerHeadPoint.x, lowerHeadPoint.y, 10,10);
  	//ellipse(beakPoint.x, beakPoint.y, 10,10);
  	//ellipse(bellyPoint.x, bellyPoint.y, 10,10);
  	//ellipse(outTailTip.x, outTailTip.y, 10,10);
  	//ellipse(tailBase.x, tailBase.y, 10,10);
  	//ellipse(outWingHinge1.x, outWingHinge1.y, 10,10);
  	//ellipse(outWingHinge2.x, outWingHinge2.y, 10,10);
  	//ellipse(innerWingHinge1.x, innerWingHinge1.y, 10,10);
  	//ellipse(innerWingHinge2.x, innerWingHinge2.y, 10,10);

  	//ellipse(bellyPoint2.x, bellyPoint2.y, 10,10);


}


function WingStates(){
	this.stateCounter = -1;			//keeps track of what state the wings are in
	this.direction = 1;				//what is added to wing state to change states. can be negative to cycle in reverse
	this.states = new Array(6);		//[x][0] is inner wing and [x][1] is outer wing
	for(var i = 0; i < this.states.length; i++){	//make second demension of array
		this.states[i] = new Array(3);
	}
	
	//Wings pointing upwards
	this.states[0][0] = createVector(470, 5);	//inner wing
	this.states[0][1] = createVector(700, 5);	//outer wing
	this.states[0][2] = createVector(0, 0);

	this.states[1][0] = createVector(270, 50);	//inner wing;
	this.states[1][1] = createVector(1000, 200);
	this.states[1][2] = createVector(0, 0);

	this.states[2][0] = createVector(200, 150);	//inner wing;
	this.states[2][1] = createVector(1070, 300);
	this.states[2][2] = createVector(0, 0);

	this.states[3][0] = createVector(80, 590);	//inner wing;
	this.states[3][1] = createVector(850, 950);
	this.states[0][2] = createVector(0, -10);

	this.states[4][0] = createVector(150, 825);	//inner wing;
	this.states[4][1] = createVector(650, 950);
	this.states[4][2] = createVector(0, -20);

	this.states[5][0] = createVector(200, 1000);	//inner wing;
	this.states[5][1] = createVector(480, 1100);
	this.states[5][2] = createVector(0, -30);
}

WingStates.prototype.getWingState = function(){
	this.stateCounter += this.direction;

	
	if(this.stateCounter >= this.states.length){
		this.direction = -1;		//switch directions
		this.stateCounter += this.direction;
	}else if(this.stateCounter < 0){
		this.direction = 1;
		this.stateCounter += this.direction;
	}

	return this.states[this.stateCounter];;
}