
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600)
monkey =createSprite(50,180,20,80) 
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.2
  
  ground=createSprite(200,250,600,20)
   ground.x = ground.width /2;
  ground.velocityX = -5
  
  invisibleGround = createSprite(200,245,600,10);
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
 background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score 
    ground.velocityX = -6
     if(keyDown("space")&&monkey.y>=170){
        monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
       monkey.collide(invisibleGround)
    spawnbanana();
    spawnObstacle();
    if(foodGroup.isTouching(monkey)){
      score=score+1
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
    }
  }

    else if(gameState===END){
      monkey.velocityX = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
      monkey.collide(invisibleGround);
    }

  
  drawSprites();
 
}


function spawnbanana(){
  if(frameCount%50==0){
    banana=createSprite(600,120,40,50)
    banana.addImage("picture",bananaImage);
    banana.scale=0.1
    
     banana.y = Math.round(random(80,120));
    banana.velocityX=-7
    banana.lifetime=300
    foodGroup.add(banana)
  }
  
}
function spawnObstacle(){
  if (frameCount%200===0){
    obstacle=createSprite(200,245,20,40)
    obstacle.addImage("picture2",obstacleImage)
     obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacle.collide(invisibleGround)
    obstacleGroup.add(obstacle);
    obstacle.velocityX=-5;
  }
}


