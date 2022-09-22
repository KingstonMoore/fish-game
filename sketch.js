var lives = 3
var score = 0
function preload(){
  bgImg = loadImage("background.jpeg")
  fishImg = loadImage("fish.png")
  hookImg = loadImage("hook.png")
  baitImg = loadImage("bait.png")
}

function setup() {
  createCanvas(600,400);
  bg = createSprite(400, 200)
  bg.addImage(bgImg)
  bg.scale = 1.7
  fish = createSprite(50, 350)
  fish.addImage(fishImg)
  fish.scale = 0.6
  edges = createEdgeSprites()
  obg = new Group()
  baitg = new Group()
}

function draw() {
  background(0);
  fish.debug = false
  fish.setCollider("rectangle", 0, 0, 150, 80)
  bg.velocityX = -3
  if (bg.x<0){
    bg.x = 400
  } 
  if (keyDown("left")){
    fish.x = fish.x - 10
  }
  if (keyDown("right")){
    fish.x = fish.x + 10
  }
  if (keyDown("up")){
    fish.y = fish.y - 10
  }
  if (keyDown("down")){
    fish.y = fish.y + 10
  }
  fish.collide(edges)

  if (frameCount%50 == 0){
    ob = createSprite(random(100, 500), -50)
    ob.addImage(hookImg)
    ob.velocityY = 5
    ob.scale = 0.3
    obg.add(ob)
  }
  for (var i=0; i<obg.length; i++){
    if (fish.isTouching(obg.get(i))){
    lives = lives - 1
    obg.get(i).destroy()
  }
  }
  for (var i=0; i<baitg.length; i++){
    if (fish.isTouching(baitg.get(i))){
    score = score + 5
    baitg.get(i).destroy()
  }
  }
  if (frameCount%75 == 0){
    var num = Math.round(random(1, 2))
    if (num === 1){
      x = -20
      vl = 3
    } else {
      x = 620
      vl = -3
    }
    bait = createSprite(x, random(100, 250))
  if (num === 1){
    bait.mirrorX(-1)
  } else{
    bait.mirrorX(1)
  }
    bait.addImage(baitImg)
    bait.velocityX = vl
    bait.scale = 0.3
    baitg.add(bait)
  }
  drawSprites();
  if (lives <= 0){
    fish.destroy()
    obg.destroyEach()
    baitg.destroyEach()
    fill("red")
    textSize(50)
    text("GAME OVER", 125, 200)
  }
 
  fill("black")
  textSize(20)
  text("Lives: "+ lives, 5, 35)
  text("Score: "+ score, 500, 35)
}