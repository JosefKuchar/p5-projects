// Created by Josef Kuchař

// Thanks to
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// https://github.com/CodingTrain/Rainbow-Code/blob/master/CodingChallenges/CC_76_10PRINT/

// 10PRINT Scroller

let speedSlider;


let offset = 0;
let colorOffset = 0;

const spacing = 20;
const colorSpeed = 2;
const size = 600;

const elements = Math.ceil(size / spacing);
const speeds = [1, 2, 4, 5, 10, 20];

let maze = []

function setup() {
  createCanvas(size, size);
  background(0);
  colorMode(HSB)

  speedSlider = createSlider(0, 5, 2, 1)

  for (let i = 0; i < elements + 1; i++) {
    maze[i] = []

    for (let j = 0; j < elements; j++) {
      maze[i][j] = random() > 0.5
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < maze.length; i++) {
    stroke((colorOffset + i * colorSpeed) % 360, 255, 255)
    for (let j = 0; j < maze[0].length; j++) {
      if (maze[i][j]) {
        line(i * spacing + offset, j * spacing, i * spacing + spacing + offset, j * spacing + spacing);
      } else {
        line(i * spacing + offset, j * spacing + spacing, i * spacing + spacing + offset, j * spacing);
      }
    }
  }

  offset -= speeds[speedSlider.value()];

  if (-offset >= spacing) {
    offset = 0;
    colorOffset += colorSpeed;
    colorOffset %= 360;
    maze.shift();
    maze.push([])

    for (let i = 0; i < maze[0].length; i++) {
      maze[maze.length - 1][i] = random() > 0.5;
    }
  }
}
