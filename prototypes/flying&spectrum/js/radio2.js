var context = new webkitAudioContext();
var analyser = context.createAnalyser();

var audioElement = document.getElementById("radio");
audioElement.addEventListener("canplay", function() {
    var source = context.createMediaElementSource(audioElement);

    source.connect(analyser);

    // Connect the output of the analyser to the destination
    analyser.connect(context.destination);
});

audioElement.play();
//audioElement.volume=0.1;

console.log(analyser.fftSize); // 2048 by default
analyser.fftSize = 2048;
console.log(analyser.frequencyBinCount); // will give us 1024 data points
analyser.frequencyBinCount = analyser.frequencyBinCount / 2;
console.log(analyser.frequencyBinCount);