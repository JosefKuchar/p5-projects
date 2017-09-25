// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4
// Modified by Josef Kuchař

var font;
var vehicles = [];
var table = [];
var points;
var paths = [];

function preload() {
  //table = loadTable('polygons.csv', 'csv', 'header');
  font = loadFont('AvenirNextLTPro-Demi.otf')
}

function setup() {
  createCanvas(600, 300);
  background(51);

  points = font.textToPoints('train', 100, 200, 192, {
    sampleFactor: 0.15
  });

  var current = points[0];
  paths[0] = new Path(points[0]);
  var currentPathIndex = 0;
  for (var j = 0; j < points.length; j++) {
    paths[currentPathIndex].vertices.push(current);
    var minimum = Number.MAX_VALUE;
    var winner = null;
    for (var i = 0; i < points.length; i++) {
      if (dist(current.x, current.y, points[i].x, points[i].y) < minimum && current != points[i] && !points[i].used) {
        minimum = dist(current.x, current.y, points[i].x, points[i].y)
        winner = points[i];
      }
    }

    if (winner != null) {
      current = winner;
      points[points.indexOf(winner)].used = true;
    }

    if (current == start) {
      currentPathIndex++;
      paths[currentPathIndex] = new Path();
    }
  }
  
  console.log(paths);

  /*
  for (var r = 0; r < table.getRowCount(); r++) {
      var x1 = parseFloat(table.getString(r, 0));
      var y1 = parseFloat(table.getString(r, 1));
      var x2 = parseFloat(table.getString(r, 2));
      var y2 = parseFloat(table.getString(r, 3));
      var x3 = parseFloat(table.getString(r, 4));
      var y3 = parseFloat(table.getString(r, 5));
      var vehicle = new Vehicle(x1, y1, x2, y2, x3, y3);
      vehicles.push(vehicle);
  }*/
}


function draw() {
  background(51);
  /*
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }*/
  beginShape();
  for (var i = 0; i < points.length; i++) {
    stroke(255, 255, 255);
    noFill();
    vertex(paths[i].x,paths[i].y);
  }
  endShape();
}
