function StaticTextInfo(){
	this.textBoxWidth = width * (2/16);
	this.textBoxHeight = height * (3/7);
	this.textBoxPos = createVector(0,0,0);
}

StaticTextInfo.prototype.run = function(){
	fill(0, 150);				//fill black and make fairly tansparent
	rect(this.textBoxPos.x, this.textBoxPos.y, this.textBoxWidth, this.textBoxHeight);
}