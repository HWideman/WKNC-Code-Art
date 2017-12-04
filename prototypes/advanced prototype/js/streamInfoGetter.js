var listenerCount;  
var nowPlayingArtist, nowPlayingSong;

function getStreamCount(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://wknc.sma.ncsu.edu/public-listener-count.php", true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
	    if (xhr.status === 200) {
	    	console.log("Listener count: " + xhr.responseText);
			listenerCount = xhr.responseText;
			listenerCount = parseInt(listenerCount);
	    } else {
	      console.error(xhr.statusText);
	    }
	  }
	};
	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(null);
}

function getNowPlaying(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://wknc.sma.ncsu.edu/public-now-playing.php", true);
	xhr.onload = function (e) {
	  if (xhr.readyState === 4) {
	    if (xhr.status === 200) {
	    	var nowPlaying = xhr.responseText;
			setArtistSong(nowPlaying);
			if(nowPlayingDragger)			//if the Dragger has been defined
				nowPlayingDragger.startRunning("\"" + nowPlayingSong + "\" by " + nowPlayingArtist);
	    } else {
	      console.error(xhr.statusText);
	    }
	  }
	};
	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};
	xhr.send(null);	
}

function setArtistSong(nowPlaying){
	var middleIndex = nowPlaying.indexOf('|');			//the index into nowPlaying of the dividing bar

	nowPlayingSong = nowPlaying.substring(0, middleIndex);
	console.log(nowPlayingSong);

	nowPlayingArtist = nowPlaying.substring(middleIndex+1);
	console.log(nowPlayingArtist);
}