//logo generator for U - A Umanesimo Artificiale
//author: Luca Ucciero



//bug test
//***************************
function debug() {
  var bmt = [
    [0, 2, 0, 0, 2, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 2, 2, 0, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 2, 0, 0, 0],
    [0, 2, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0]
  ];
  return bmt;
}
//***************************

//code

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

document.addEventListener("DOMContentLoaded", function() {
  //sliders
  //creSlider -> slider to add cells
  //emoSlider -> slider connected to emotions, add grayscale
  //effSlider -> slider to swap cells into 0, 1 graphically
  var creSlider = document.getElementById('creSlider'),
      emoSlider = document.getElementById('emoSlider'),
      effSlider = document.getElementById('effSlider'),
      alcSlider = document.getElementById('alcSlider');

  //I'll use it to get a click/tap event on the canvas
  var matContainer = document.getElementById('sketch-holder');

  var cells = [1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0];

  var matrix = [];

  //from "Tables of Cellular Automaton Properties" paper, 1986
  var rulesList = [
    ['rule_1',   [0, 0, 0, 0, 0, 0, 0, 1]],
    ['rule_11',  [0, 0, 0, 0, 1, 0, 1, 1]],
    ['rule_18',  [0, 0, 0, 1, 0, 0, 1, 0]],
    ['rule_19',  [0, 0, 0, 1, 0, 0, 1, 1]],
    ['rule_57',  [1, 0, 0, 0, 0 ,0, 0, 0]],
    ['rule_73',  [0, 1, 0, 0, 1, 0, 0, 1]],
    ['rule_105', [0, 1, 1, 0, 1, 0, 0, 1]],
    ['rule_110', [0, 1, 1, 0, 1, 1, 1, 0]]
  ];

  var currentRule = 0;
  var w = 50;

  //adding colors:
  //write outside the draw() a function to add colors.
  //if there is a parameter different from 0 on the emoSlider then add colors.


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
    var ruleset = rulesList[currentRule][1];

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

    return wolfMatrix;
  }

  //what to draw

  //p5.js main. In instance mode
  //https://github.com/processing/p5.js/wiki/Global-and-instance-mode
  //that's why a use that "weird" p  before p5.js methods
  var s = function( p ) {
    //about loop & noLoop: https://p5js.org/reference/#/p5/noLoop
    // I used them to stop and restart the draw fuction
    //otherwise it will loop continuosly as defined in the p5.js library

    // -------o------- sliders change callback function:

    //creative
    //old one
    /*
    creSlider.addEventListener("change", function(){
        if (cells[creSlider.value] === 0 ) {
          cells[creSlider.value] = 1
        } else {
          cells[creSlider.value] = 0
        }
      console.log(cells);
      p.loop();
    });
    */
    //creative
    //new one
    // change ruleset on slide
    creSlider.addEventListener("change", function(){
        //get the actual rule applied
        // go to the next one if the value is > than current index
      if (creSlider.value > currentRule && currentRule >= 0 && currentRule < rulesList.length ) {
        currentRule = currentRule + 1
        console.log(rulesList[currentRule][0]);
        // otherwise if the value is < than current index go to the previous
      } else if (creSlider.value < currentRule && currentRule > 0 && currentRule <= rulesList.length ) {
          currentRule = currentRule - 1
          console.log(rulesList[currentRule][0]);
      } else {
        console.log('you should not see this');
      }
      p.loop();
    });

    //emotion
    emoSlider.addEventListener("change", function(){
      p.loop();
    });
    //efficiency
    effSlider.addEventListener("change", function(){
      p.loop();
    });
    //immortality
    alcSlider.addEventListener("change", function(){
      p.loop();
    });

    //create polygon fuction
    function polygon(x, y, radius, slidevalue) {
      console.log('slidevalue' + slidevalue);
      if (slidevalue == 0 || slidevalue == 1 ){
        var npoints = 4;
      } else if (slidevalue == 2 || slidevalue == 3 ){
        var npoints = 4+2;
      } else if (slidevalue == 4 || slidevalue == 5 ){
        var npoints = 4+4;
      } else if (slidevalue == 6 || slidevalue == 7 ){
        var npoints = 4+8;
      } else {
        var npoints = 4+30;
      }

      console.log('npoint' + npoints);
      var angle = p.TWO_PI / npoints;
      p.beginShape();
      for (var a = 0; a < p.TWO_PI; a += angle) {
        var sx = x + p.cos(a) * radius;
        var sy = y + p.sin(a) * radius;
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
    }

    //what to display in the draw function
    function display(matrix) {
      console.log('display');
      console.log(matrix);
      //draw the matrix
      // i like it with inverted colors
      for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++){
          //if 1 = white square (inverted)
          if (matrix[i][j] === 1) {
            if (getRandomInt(32)+1 <= effSlider.value) {
              p.fill(255)
              p.noStroke();
              p.rect(j*w, i*w, w, w);
              p.fill(0);
              p.textSize(w*0.5);
              p.textFont('Space Mono');
              p.textAlign(p.CENTER, p.CENTER);
              p.text(' 1', j*w, i*w, w, w);
            } else if (getRandomInt(16) <= alcSlider.value) {
              p.fill(255)
              p.noStroke();
              p.rect(j*w, i*w, w, w);
              p.strokeWeight(4);
              p.stroke(0);
              polygon((j*w)+(w/2), (i*w)+(w/2), w*0.5, alcSlider.value);
            } else {
              p.fill(255)
              p.noStroke();
              p.rect(j*w, i*w, w, w);
            }
            //if 0 = black square (inverted)
          } else {
              if (getRandomInt(16) <= emoSlider.value){
                p.fill(0 + 28*getRandomInt(emoSlider.value))
                p.noStroke();
                p.rect(j*w, i*w, w, w);
              } else if (getRandomInt(32)+1 <= effSlider.value) {
                p.fill(255)
                p.noStroke();
                p.rect(j*w, i*w, w, w);
                p.fill(0);
                p.textSize(w*0.5);
                p.textFont('Space Mono');
                p.textAlign(p.CENTER, p.CENTER);
                p.text(' 0', j*w, i*w, w, w);
              } else  {
                p.fill(0)
                p.noStroke();
                p.rect(j*w, i*w, w, w);
              }
          }
        }
      }
      p.noLoop()
    };

  p.setup = function() {
    p.createCanvas(800, 500);
    p.stroke(255);
    p.noFill();
    //p.noLoop(); //draw doesn't loop


  };

  p.draw = function() {
    p.clear();
    //pass deubg() to test
    //else
    //pass wolfRamize(cells, matrix)
    display(wolfRamize(cells, matrix));
    //brand typography
    //all center
    /*
    p.fill(0)
    p.noStroke();
    p.rect(0, w*3, w*9, w*3);
    p.fill(255);
    p.textSize(w*1.5);
    p.textFont('Space Mono');
    p.textAlign(p.CENTER, p.CENTER);
    p.text('U – A', 0, w*3, w*10, w*2);
    p.textSize(w*0.66);
    p.text('umanesimo artificiale', 0, w*5, w*10, w*1);
    */
    /*
    p.fill(255)
    p.stroke(0)

    p.rect(0, 0, w*4, w*2);
    p.fill(0);
    p.textSize(w);
    p.noStroke();
    p.textFont('Space Mono');
    p.textAlign(p.LEFT, p.TOP);
    p.text('U – A', 0, 0, w*4, w*2);
    p.textSize(w*0.33);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('umanesimo artificiale', 0, w*1, w*5, w*1);
    */

  };
};
var myp5 = new p5(s, 'sketch-holder');

});
