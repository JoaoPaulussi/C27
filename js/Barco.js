class Barco{
    constructor(x,y,width,height,boatPos,boatAnimate){
        this.animation = boatAnimate;
        this.speed = 0.05;
        this.body = Bodies.rectangle(x,y,width,height);
        this.width = width;
        this.height = height;
        this.image = loadImage("./assets/barco.png");
        this.boatPosition = boatPos;
        this.isBroken = false
        World.add(world,this.body);
    }
    animate(){
        this.speed+=0.05;
    }
    display(){
        var angle = this.body.angle;
        var pos = this.body.position;

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,this.boatPosition,this.width,this.height);
        pop();
    }
    remove(index){
        this.animation = brokenBoatAnimation;
        this.speed = 0.05;
        this.width = 300;
        this.height = 300;
        this.isBroken = true;
        setTimeout(()=>{
            Matter.World.remove(world,barcos[index].body);
            delete barcos[index]
        }
        ,2000)
    }
}