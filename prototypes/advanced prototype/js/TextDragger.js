function TextDragger(){
	this.startPosition;			//where the Dragger starts offscreen
	this.endPosition;		//where the Dragger ends offscreen
	this.position;		//position when made is startPosition
	this.velocity = createVector(10, 0);	
	this.textString = "";
	this.textWidth = 0;										//width of this.textString
	this.offCanvasBuffer = 100;									//amount of extra space the text goes off the screen
	this.sizeOfText = 100;									//size of text in px
	this.textBoxHeight = this.sizeOfText * 2;				//height of the text box following Dragger is twice sizeOfText
	this.isRunning = false;									//we don't want the Dragger to run constantly, only when called to start
}

TextDragger.prototype.startRunning = function(text){
	if(!this.isRunning){				//checks it is not already running as we do not want to reset mid-run
		this.isRunning = true;
		this.textString = text;

		push();			//push on new layer to calculate the textWidth and not affect the textSize elsewhere
			textSize(this.sizeOfText);
			this.textWidth = textWidth(this.textString);			//calculate the length of the text
			this.textBoxWidth = this.textWidth + 40;				//make the box a little bigger than the text itself
		pop();

		//set start and end positions
		var startPositionX = (-1)*(this.textWidth + this.offCanvasBuffer);			//calculate starting X position. multiply -1 to make X position negative. Give 100px buffer before entering canvas
		var startPositionY = endPositionY = height / 3;								//start and end Y are the same			
		this.startPosition = createVector(startPositionX, startPositionY);

		var endPositionX = width + this.offCanvasBuffer;
		this.endPosition = createVector(endPositionX, endPositionY);

		this.position = createVector(this.startPosition.x, this.startPosition.y);
	}
}

TextDragger.prototype.run = function(){
	if(this.isRunning){
		this.positionUpdate();
		this.render();
	}
}

TextDragger.prototype.positionUpdate = function(){
	this.position.add(this.velocity);

	if(this.position.x >= this.endPosition.x){		//if we have reached the end point, reset the position to the start
		this.position.x = this.startPosition.x;
		this.isRunning = false;						//we reached the end so stop running
	}		
}

TextDragger.prototype.render = function(){
	//push on a new layer so that the attributes set are local to this render
	push();
		fill(255);
		stroke(0);
		rect(this.position.x, this.position.y, this.textBoxWidth, this.textBoxHeight);		//draw the rectangle

		fill(0);
		textSize(this.sizeOfText);
		text(this.textString, this.position.x+20, this.position.y + (this.textBoxHeight/1.5));	
	pop();
}