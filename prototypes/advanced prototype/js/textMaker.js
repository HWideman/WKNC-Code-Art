function TextMaker(){
	this.textSize = 120;
	this.fontStyle = "Helvetica";
	this.ArtistX = 50;
	this.ArtistY = 150;
	this.SongX = 50;
	this.SongY = 300;
}

TextMaker.prototype.run = function(){
	textSize(this.textSize);
	textFont(this.fontStyle);
	text(nowPlayingArtist, this.ArtistX, this.ArtistY);
	text("\"" + nowPlayingSong + "\"", this.SongX, this.SongY);
}