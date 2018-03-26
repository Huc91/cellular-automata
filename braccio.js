function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function dseg(angle, r, ang){
	if (ang === true) {
		//do cos
		return r * cos(angle);
	} else {
		//do sin
		return r * sin(angle);
	}
}

function draw() {
  background(51);
  var x = 10;
  var y = 10;
  stroke(255);
  strokeWeight(8);
  point(x,y);

  //var angle = 45;
  //var r = 100;

  //var dx = r * cos(angle);
  //var dy = r * sin(angle);

  line(x,y,x+dseg(45, 100, true), y + dseg(45, 100,false));
	line(x+dseg(45, 100, true), y + dseg(45, 100, false),x+dseg(45, 100, true)+dseg(30, 200, true),y + dseg(-30, 100, false)+dseg(30, 200, false));


}
