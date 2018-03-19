//logo generator for U - A Umanesimo Artificiale
//author: Luca Ucciero

document.addEventListener("DOMContentLoaded", function() {
  //sliders
  var creSlider = document.getElementById('creSlider');
  console.log(creSlider.value);

  var cells = [1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0];

  var matrix = [];

  //from "Tables of Cellular Automaton Properties" paper, 1986
  var rulesList = {
    rule_1:   [0, 0, 0, 0, 0, 0, 0, 1],
    rule_11:  [0, 0, 0, 0, 1, 0, 1, 1],
    rule_18:  [0, 0, 0, 1, 0, 0, 1, 0],
    rule_19:  [0, 0, 0, 1, 0, 0, 1, 1],
    rule_57:  [1, 0, 0, 0, 0 ,0, 0, 0],
    rule_73:  [0, 1, 0, 0, 1, 0, 0, 1],
    rule_105: [0, 1, 1, 0, 1, 0, 0, 1],
    rule_110: [0, 1, 1, 0, 1, 1, 1, 0]
  }

  var ruleset = rulesList.rule_1;

  var w = 50;

  creSlider.addEventListener("change", function(){
      if (cells[creSlider.value] === 0 ) {
      cells[creSlider.value] = 1
      } else {
      cells[creSlider.value] = 0
      }
      console.log(cells);
  });


  //generate a blank all 0s matrix
  function generateMatrix(){
    for (var i = 0; i < cells.length; i++){
      //create a row
      //the row is [0,0,0,0,0,0,0,0]
      matrix.push([0,0,0,0,0,0,0,0,0]);
    }
  }
  generateMatrix();

  function wolfRamize(cells, matrix){
    //take the existing matrix
    //and then apply the wolfram cellular automaton
    //cellular automaton based on Shiffman's book The Nature of Code http://natureofcode.com/

    wolfMatrix = matrix.slice();

    for (var i = 0; i < wolfMatrix[0].length; i++){
      wolfMatrix[0][i] = cells[i]
    }
    //for every row, start from the 1 row not 0
    for (var i = 1; i < wolfMatrix.length -1; i++){
      //For every spot, determine new state by examing current state, and neighbor states
      //Ignore edges that only have one neighor
      for (var j = 1; j < wolfMatrix[0].length-1; j++) {
        var left   = wolfMatrix[i-1][j-1];   // Left neighbor state
        var me     = wolfMatrix[i-1][j];     // Current state
        var right  = wolfMatrix[i-1][j+1];   // Right neighbor state
        //update the wolfMatrix state with wolframized cells
        wolfMatrix[i][j] = rules(left, me, right);
    }
    }
    return wolfMatrix;
  }

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

  //what to draw

  //p5.js main
  var s = function( p ) {

    function display(matrix) {
      for (var i = 0; i < matrix.length -2; i++) {
        for (var j = 0; j < matrix[0].length; j++){
        if (matrix[i][j] == 1) {
          p.fill(255)
        } else if (matrix[i][j] == 0) {
            p.fill(0)
            p.noStroke();
            p.rect(j*w, i*w, w, w);
          } else {
          p.fill (125);
          p.noStroke();
          p.rect(j*w, i*w, w, w);
        }
      }
      }
    };

  p.setup = function() {
    p.createCanvas(800, 800);
    p.stroke(255);
    p.noFill();
  };

  p.draw = function() {
    p.clear();
    display(wolfRamize(cells, matrix));
  };
};
var myp5 = new p5(s, 'sketch-holder');

});
