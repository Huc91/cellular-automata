// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

var yoff = 0.0;

function setup() {
  createCanvas(400, 400);
	background(0);
}

function draw() {

	fill(0)
	noFill();
	stroke(255)
  translate(width / 2, height / 2);
	noLoop();

  var radius = 100;

  beginShape();
  var xoff = 0;
	for (var c = 0; c < 10; c++) {
  for (var a = 0; a < TWO_PI; a += 0.2) {
    var offset = map(noise(xoff, yoff), 0, 1, -10, 100) + c*10;
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
    xoff += 10;
    //ellipse(x, y, 4, 4);
  }
	}
  endShape();

  yoff += 0.01;
}
