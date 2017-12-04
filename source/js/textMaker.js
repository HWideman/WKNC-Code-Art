//Puts the text below Now Playing on the info bar
function TextMaker(){
	this.textSize = 35;
	this.fontStyle = "Helvetica";
	this.textPos = createVector(100, 220);
}

TextMaker.prototype.run = function(){
	push();
	stroke(255);
	fill(255);		//make text white
	textLeading(40);  // Set leading to 20
	textSize(this.textSize);
	textFont(this.fontStyle);
	if(nowPlayingArtist.indexOf("NCSU Basektball") == -1 && nowPlayingArtist.indexOf("NCSU Baseball") == -1){		//if we are not broadcasting a game
		this.renderNormalNowPlaying();
	}else{
		this.renderSportsFree();
	}	
	pop();
}

TextMaker.prototype.renderNormalNowPlaying = function(){
	text(this.getGenreName(), this.textPos.x + 150, this.textPos.y - 20);
	text("\"" + nowPlayingSong + "\" by " + nowPlayingArtist, this.textPos.x, this.textPos.y, 700, 200);
}

TextMaker.prototype.renderSportsFree = function(){
	text("WKNC Sportsfree Webstream, to hear the sports broadcast, tune into 88.1FM", this.textPos.x, this.textPos.y, 700, 200);
}

TextMaker.prototype.getGenreName = function(){
	if(THEME === DAYTIME_LOWSUN){
		return "Daytime Indie Rock"
	}else if(THEME === DAYTIME){
		return "Daytime Indie Rock";
	}else if(THEME === UNDERGROUND){
		return "Underground Hip Hop";
	}else if(THEME === AFTERHOURS){
		return "Afterhours Electronic"
	}else if(THEME === CHAINSAW){
		return "Chainsaw Metal";
	}
}