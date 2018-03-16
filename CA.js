//wolfram automaton
//array of cells
//edit on Shiffman example
var cells = [0, 0, 0 ,1 ,1 ,1 ,0 ,0 ,0];
var art = 0.2


var ruleset = [1,0,0,1,1,0,1,0];
var generation = 0;
var w = 50;

function generate(cells){
  // First we create an empty array filled with 0s for the new values
  var nextgen = [];
  for (var i = 0; i < cells.length; i++) {
    nextgen[i] = 0;
  }
  // For every spot, determine new state by examing current state, and neighbor states
  // Ignore edges that only have one neighor
  for (var i = 1; i < cells.length-1; i++) {
    var left   = cells[i-1];   // Left neighbor state
    var me     = cells[i];     // Current state
    var right  = cells[i+1];   // Right neighbor state
    nextgen[i] = rules(left, me, right); // Compute next generation state based on ruleset
  }
  // The current generation is the new generation
  this.cells = nextgen;
  this.generation++;

// This is the easy part, just draw the cells
function display() {
  for (var i = 0; i < cells.length; i++) {
    if (cells[i] == 1) {
      fill(255)
    } else if (cells[i] == 0) {
      if (Math.random() <= art){
        fill(125)
        noStroke();
        triangle(i*w, generation*w+50, i*w+25, generation*w, i*w+50, generation*w+50);
      } else {
        fill(0)
        noStroke();
        rect(i*w, generation*w, w, w);
      }
    } else {
      fill (125);
      noStroke();
      rect(i*w, generation*w, w, w);
    }
  }
};

// Implementing the Wolfram rules
// Could be improved and made more concise, but here we can explicitly see what is going on for each case
function rules(a, b, c) {
  if (a == 1 && b == 1 && c == 1) return ruleset[0];
  if (a == 1 && b == 1 && c === 0) return ruleset[1];
  if (a == 1 && b === 0 && c == 1) return ruleset[2];
  if (a == 1 && b === 0 && c === 0) return ruleset[3];
  if (a === 0 && b == 1 && c == 1) return ruleset[4];
  if (a === 0 && b == 1 && c === 0) return ruleset[5];
  if (a === 0 && b === 0 && c == 1) return ruleset[6];
  if (a === 0 && b === 0 && c === 0) return ruleset[7];
  return 0;
};
display();
}

function setup() {
  createCanvas(800, 2000);
  stroke(255);
  noFill();
}

function draw() {
  if(generation <= 8){
    generate(cells);
  }
}
