var context = new (window.AudioContext || window.webkitAudioContext)();
var analyser = context.createAnalyser();
analyser.minDecibels = -85;
//analyser.maxDecibels = 0;
analyser.smoothingTimeConstant = .85;

var audioElement = document.getElementById("radio");
audioElement.addEventListener("canplay", function() {
    var source = context.createMediaElementSource(audioElement);

    source.connect(analyser);

    // Connect the output of the analyser to the destination
    analyser.connect(context.destination);
});

audioElement.play();


console.log(analyser.fftSize); // 2048 by default
analyser.fftSize = 2048;
console.log(analyser.frequencyBinCount); // will give us 1024 data points
