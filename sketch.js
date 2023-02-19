let maxw = 20;
let triangles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);  // 360, 100, 100, 1 

  let cols = floor(width/maxw)+1;
  let rows = floor(height/maxw)+1;

  for(let x=0; x<cols; x++) {
    for(let y=0; y<rows; y++) {
      triangles.push(new RotatingTriangle(x*maxw, y*maxw));
    }
  }
  
}

function draw() {
  background(0);

  for(let i=0; i<triangles.length; i++) {
    triangles[i].show();
    triangles[i].update();
  }
 
}

class RotatingTriangle {
  // attribute
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.w = maxw;
    this.rad = 0;
    this.hue = 0;
  }
  // method
  show() {
    noStroke();
    fill(this.hue, 100, 100);

    push();
    translate(this.x, this.y);
    rotate(this.rad);
    beginShape();
    vertex(this.w/2, 0);
    vertex(-this.w/2, -this.w/4);
    vertex(-this.w/2, this.w/4);
    endShape(CLOSE);
    pop();
  }

  update() {
    this.rad = atan2(mouseY-this.y, mouseX-this.x);

    let distance = dist(this.x ,this.y, mouseX, mouseY);
    let maxd = dist(0, 0, width, height);
    this.w = map(distance, 0, maxd, maxw, 0);
    this.hue = map(distance, 0, maxd, 60, 120);
  }
}
