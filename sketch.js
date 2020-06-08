var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, gameOverImg, restart, restartImg;
var cloudsGroup; 
var obstacleGroup;  
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,50);
  gameOver.addImage("game Over",gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,85);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}
function draw() {
  background("LightSteelBlue");
  if (gameState === 1){
  if(keyDown("space") && trex.isTouching(ground)) {
    trex.velocityY = -10;
  }
  
    ground.velocityX = -(6+3*score/100);
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
  
  score = score+Math.round(getFrameRate()/60);
    if(trex.isTouching(obstaclesGroup)){
     gameState = 0; 
    }
  }
  else if (gameState === END){
           cloudsGroup.setVelocityXEach (0);
           obstaclesGroup.setVelocityXEach (0);
           ground.velocityX = 0;
           cloudsGroup.setLifetimeEach(-1);
           obstaclesGroup.setLifetimeEach(-1);
           trex.changeAnimation("collided",trex_collided);
           trex.velocityY = 0;
           gameOver.visible = true;
           restart.visible = true;
           }
  if (mousePressedOver(restart)){
            reset(); 
           }
  trex.collide(invisibleGround);
  text("Score:"+score, 500, 15);
  drawSprites();
}
function spawnClouds(){
  if(frameCount%60 === 0){
     var cloud;
     var y = Math.round(random(90,110))
     cloud = createSprite(600, y);
     cloud.addAnimation("cloud", cloudImage);
     cloud.velocityX = -5;
     cloud.lifetime = 120;
     cloud.scale = 0.5;
     cloud.depth = trex.depth;
     trex.depth = trex.depth+1;
     cloudsGroup.add(cloud);
     }
}
function spawnObstacles(){
  if(frameCount%50 === 0){
    var obstacles;  
    var rand = Math.round(random(1,6));
    obstacles = createSprite(600,160);
    switch(rand){
      case 1 : obstacles.addAnimation("obstacle 1", obstacle1);
      break;
      case 2 : obstacles.addAnimation("obstacle 2", obstacle2);
      break;
      case 3 : obstacles.addAnimation("obstacle 3", obstacle3);
      break;
      case 4 : obstacles.addAnimation("obstacle 1", obstacle4);
      break;
      case 5 : obstacles.addAnimation("obstacle 5", obstacle5);
      break;
      case 6 : obstacles.addAnimation("obstacle 6", obstacle6);
      break;
    }
    obstacles.lifetime = 100;
    obstacles.scale = 0.5;
    obstacles.velocityX = -(6+3*score/100);
    obstaclesGroup.add(obstacles);
  }
}
function reset(){
   gameState = PLAY;
   trex.changeAnimation("running", trex_running); 
   score = 0;
   gameOver.visible = false;
   restart.visible = false;
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();

}