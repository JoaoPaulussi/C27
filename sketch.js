const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, cannonBall;
var balls = [];
var barcos = [];
var boatAnimation = [];
var boatSpritedata, boatSpritesheet;
var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;
var waterSplashAnimation = [];
var waterSplashSpritedata, waterSplashSpritesheet;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("assets/boat/boat.json");
  brokenBoatSpritedata = loadJSON("assets/boat/brokenBoat.json");
  waterSplashSpritedata = loadJSON("assets/waterSplash/waterSplash.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");
  brokenBoatSpritesheet = loadImage("assets/boat/brokenBoat.png");
  waterSplashSpritesheet = loadImage("assets/waterSplash/waterSplash.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  var options = {
    isStatic: true,

  }
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower)
  cannon = new Cannon(180, 110, 130, 100, angle);
  var boatFrames = boatSpritedata.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
  var brokenBoatFrames = brokenBoatSpritedata.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
  var waterSplashFrames = waterSplashSpritedata.frames;
  for (i = 0; i < waterSplashFrames.length; i++) {
    var pos = waterSplashFrames[i].position;
    var img = waterSplashSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterSplashAnimation.push(img);
  }
  //cannonBall = new CannonBall(cannon.x, cannon.y);
  //barco = new Barco(width - 79, height - 60, 170, 170, -80);
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  //rectMode(CENTER);
  //rect(tower.position.x,tower.position.y,160,310);
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop();
  cannon.display();
  for (i = 0; i < balls.length; i++) {
    showCannonBall(balls[i], i);
    collision(i);
  }
  showBarcos();
}

function showCannonBall(ball, index) {
  if (ball) {
    ball.show();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index)
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall)
  }
}
function keyReleased() {
  if (keyCode === 32) {
    balls[balls.length - 1].shoot();
  }
}
function showBarcos() {
  if (barcos.length > 0) {
    if (
      barcos[barcos.length - 1] === undefined || barcos[barcos.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var barco = new Barco(width, height - 100, 170, 170, position, boatAnimation);
      barcos.push(barco);
    }
    for (var i = 0; i < barcos.length; i++) {
      if (barcos[i]) {
        Matter.Body.setVelocity(barcos[i].body, {
          x: -0.9,
          y: 0,
        })
        barcos[i].display();
        barcos[i].animate();
      }
    }
  }
  else {
    var barco = new Barco(width, height - 60, 170, 170, -60, boatAnimation);
    barcos.push(barco);
  }
}
function collision(index) {
  for (var i = 0; i < barcos.length; i++) {
    if (balls[index] !== undefined && barcos[i] !== undefined) {
      var collide = Matter.SAT.collides(balls[index].body, barcos[i].body);
      if (collide.collided) {
        barcos[i].remove(i);
        Matter.World.remove(world, balls[index].body);
        delete balls[index]
      }
    }
  }
}