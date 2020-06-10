let song, analyzer, rms, x, h;

function preload() {
  song = loadSound('blinding-lights.mp3');
}


function toggleSound() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function setup() {
  let cnv = createCanvas(800, 400);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  song.amp(0.4);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);

  //frameRate(30);
  song.play()

}

function draw() {
  background(220);

  let spectrum = fft.analyze();

  noStroke();
  fill(255, 0, 255);
  for (let i = 0,j = 0; i < spectrum.length; i++,j++) {
    x = map(i, 0, spectrum.length, 0, width);
    h = -height + map(spectrum[i], 0, 255, height, 0);
    //rect(x, height, 30, h)
    heights[j]=-h;
    i = i + 30;
  }

  // Get the average (root mean square) amplitude
  rms = analyzer.getLevel();

  fill(50);
  stroke(0);
  rect(100, 100, 60, 60);


  text('tap to play', 20, 20);
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}
