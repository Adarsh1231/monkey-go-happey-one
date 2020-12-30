var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 1;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.debug = true;
  obstacleGroup.debug = true;
}


function draw() {
background("white");
  
  stroke("white");
  textSize(20)
  fill("white");
  text("Score:"+score ,450,450);
  
  stroke("black");
  textSize(20);
  fill ("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime: "+ survivalTime, 100,50);
  
  monkey.collide(ground);
  
  ground.x = ground.width/2
  ground.velocityX = -4;
  console.log(ground.x);
  
  if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 1.1  
  
  if (monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
  }    
   if (monkey.isTouching(obstacleGroup)){
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
     survivalTime = 0;
   }
    
    
  if (frameCount%80 === 0){
    spawnbanana();
  }
  
  if (frameCount%200 === 0){
    spawnObstacle();
  }
  
  drawSprites();
}
function spawnbanana(){
    var banana = createSprite(365,170,20,20);
    banana.addAnimation("banana",bananaImage);
    banana.scale =   0.1;
    banana.velocityX = -(4+survivalTime*1.5/100);
    banana.lifetime = 220;
    foodGroup.add(banana);
  }
function spawnObstacle(){
    var obstacle = createSprite(350,320,20,20);
    obstacle.addAnimation("obstacle",obstacleImage);
    obstacle.scale =   0.15;
    obstacle.velocityX = -(4+survivalTime*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }