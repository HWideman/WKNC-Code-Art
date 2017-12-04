Code-Art-WKNC
=============
This work of generative art, completed as part of the NCSU Libraries Code+Art Student Visualization Contest, visualizes the live Internet stream of 88.1 WKNC, the student-run noncommercial radio station of NC State University. Boasting 25,000 watts, WKNC can be heard throughout the Triangle and far beyond via their webcast.

Watch as Raleigh’s buildings light up to the frequency of the music and the flying boids pulse to the bass. Each flying boid represents a single online listener. Stream right now and watch your boid come to life at the radio tower! Moreover, keep an eye on the color of the sky as it changes color to fit WKNC’s block scheduling.

There are three ways to listen:
1. Tune in to 88.1 FM on your radio
2. Stream online at wknc.org/listen
3. Download the “NC State Student Media” app for Andriod or iOS

The graphics are made with P5.js by rendering shapes onto an HTML5 <canvas> element. The main class is js/core.js. This contains the P5.js provided draw() function, which is called 30 times a second to update the frame. The buildings are .gif files made from Adobe Illustrator vectors.
