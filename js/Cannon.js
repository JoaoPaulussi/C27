class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannon = loadImage("./assets/canon.png");
    this.cannon_base = loadImage("./assets/cannonBase.png");
    
  }
  display(){

    if(keyIsDown(DOWN_ARROW)&& this.angle < 70){
      this.angle += 1;
    }
    if(keyIsDown(UP_ARROW)&& this.angle > -30){
      this.angle -= 1;
    }
    push();
    translate(this.x,this.y);
    //rectMode(CENTER);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannon,0,0,this.width,this.height);
    //rect(this.x,this.y,this.width,this.height);
    pop();
    //rect(70,20,200,200);
    image(this.cannon_base,70,20,200,200);
    //noFill();
  }
  
}
