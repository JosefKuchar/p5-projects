// Daniel Shiffman
// http://codingtra.in
// Fractal Spirograph
// Modified for large image render by Josef Kuchař

ArrayList<PVector> path;
PGraphics pg;

int resolution = 2048;
int weight = 1;
int size = 10000;
int circles = 63;

Orbit sun;
Orbit end;

void setup() {
  size(600, 150);
  pg = createGraphics(size, size, JAVA2D);
  path = new ArrayList<PVector>();
  sun = new Orbit(pg.width/2, pg.height/2, pg.width/4, 0);
  Orbit next = sun;
  for (int i = 0; i < circles; i++) {
    next = next.addChild();
  }
  end = next;
}

void draw() {
  background(51);
  if(sun.child.angle >= HALF_PI * 3) {
    pg.beginDraw();
    pg.background(255);
    pg.stroke(0);
    pg.strokeWeight(weight);
    pg.noFill();
    pg.beginShape();
    for (PVector pos : path) {
      pg.vertex(pos.x, pos.y);
    }
    pg.endShape();
    pg.endDraw();
    pg.save("render/render.png");
    noLoop();
  }

  for (int i = 0; i < resolution; i++) {
    Orbit next = sun;
    while (next != null) {
      next.update();
      //next.show();
      next = next.child;
    }
    path.add(new PVector(end.x, end.y));
  }

  Orbit next = sun;
  while (next != null) {
    next = next.child;
  }
  
  String percentage = str(((sun.child.angle + HALF_PI) / TWO_PI) * 100) + "%";
  textSize(90);
  text(percentage, 30, 110);
}