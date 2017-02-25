// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4
// Modified by Josef Kuchař

var font;
var vehicles = [];
var table = [];

function preload() {
  table = loadTable('polygons.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 300);
  background(51);

  for (var r = 0; r < table.getRowCount(); r++) {
      var x1 = parseFloat(table.getString(r, 0));
      var y1 = parseFloat(table.getString(r, 1));
      var x2 = parseFloat(table.getString(r, 2));
      var y2 = parseFloat(table.getString(r, 3));
      var x3 = parseFloat(table.getString(r, 4));
      var y3 = parseFloat(table.getString(r, 5));
      var vehicle = new Vehicle(x1, y1, x2, y2, x3, y3);
      vehicles.push(vehicle);
  }
}


function draw() {
  translate(30, 50);
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
