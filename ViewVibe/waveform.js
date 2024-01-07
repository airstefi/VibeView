var fft // Allow us to analyze the song
var numBars = 1024 // The number of bars to use; power of 2 from 16 to 1024
var particles=[];
var song, // The p5 sound object
    button,shockwave,react_x, react_y,radius, radius_old, deltarad, bar_height,
    isSeeking = 0,
    col = {
      r:255,
      g:0,
      b:0
    },

    col2 = {
      r:255,
      g:0,
      b:0
    };

    react_x = 0;
    react_y = 0;
    radius = 0;
    deltarad = 0;
    shockwave = 0;
    rot = 0;
    intensity = 0;

// Load our song
var loader = document.querySelector(".loader");
document.getElementById("audiofile").onchange = function (event) {
  if (event.target.files[0]) {
      if (typeof song != "undefined") {
          song.disconnect();
          song.stop();
          clear();
      }

      loader.classList.add("loading");

      // Load our new song
      song = loadSound(
          URL.createObjectURL(event.target.files[0]),
          // Callback function for when the sound is loaded
          function () {
              loader.classList.remove("loading"); // Remove loading message
          }
      );
  }
};


function mode(action) {
  console.log(action);
  if(action == 'play'  )  {
    document.getElementById('button_play').style.display = "none";
    document.getElementById('button_pause').style.display = "block";
    song.play();
  }
  if(action == 'pause') {
    document.getElementById('button_play').style.display = "block";
    document.getElementById('button_pause').style.display = "none";
    song.pause();
  }
}

var canvas;

function setup() { // Setup p5.js
    canvas = createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
  
  var button = document.getElementById('play')
  
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
	
  // Patch the input to an volume analyzer
  analyzer.setInput(song);
  fft = new p5.FFT();
}

col.r= 125;
col.g= 40;
col.b= 40;

col2.r= 125;
col2.g= 75;
col2.b= 75;

function changeCircle() {
  //circle change

  if (col2.g > 74 )  {
    col2.g= col2.g+1;
    col2.b= col2.b+1;
  }
  if (col2.g>93){
    col2.g= 75;
    col2.b= 75;
  }
}

function changeBackground() {

  //background change
  if (col.g > 39 )  {
    col.g= col.g+1;
    col.b= col.b+1;
  }
  if (col.g>75){
    col.g= 20;
    col.b= 20;
  }
}

function changeHue() {
  if (col.r >=0)  {
    col.r= col.r+60;
    col2.r=col2.r+60;
  }
  if (col.r >360)  {
    col.r= 0;
    col2.r=0;
  }
}

function touchStarted() {
  getAudioContext().resume()
}

function draw() {
  background(51);
  background(col.r,col.g,col.b);
  colorMode(HSL);
  stroke(255);
  strokeWeight(3);
  noFill();

//   translate(width/2, height/2);

//   fft.analyze();
 
  var wave = fft.waveform();

  beginShape();
  for (var i = 0; i<width; i++)
  {
    var index = floor(map(i,0,width,0,wave.length));

    var x = i;
    var y = wave[index]*150+height/2;
    vertex(x,y)
  }
  endShape();
  


}

//change the color of the backroung to different colours
setInterval(changeBackground,2000);//2 seconds
setInterval(changeHue,2000); //5 seconds



