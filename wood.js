// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;

function setup() {
  createCanvas(500,500);
  background(0);
}

function draw() {
 walk();
	noLoop();
}

  function walk() {
		//map(value,start1,stop1,start2,stop2,[withinBounds])
		for (var j = 0; j < 500/10; j++) {
			for (var i = 0; i < 500; i++){
				var x = i
				var y = j*50 + map(noise(i/500),0,1,0,width);
				strokeWeight(2);
				fill(0);
				stroke(255);
				ellipse(x, y, 1, 1);
			}
		}
    //this.noff.add(0.01,0.01,0);
  }
