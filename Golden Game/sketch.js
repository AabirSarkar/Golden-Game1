var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player;
var ground,ivisibleGround, groundImage;

var animalsGroup, animalImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var animals =0;


function preload(){
  
 
    playerImg = loadImage("Images/truck.png")
    groundImage = loadImage("Images/forest.jpg");
    
    
    
    obstacle1 = loadImage("Images/trap1.png");
    obstacle2 = loadImage("Images/trap2.png");
    obstacle3 = loadImage("Images/trap3.png");

    animal1Image = loadImage("Images/gorrila.png");

   animal2Image = loadImage("Images/leopard.png");
   
   animal3Image = loadImage("Images/rhino.png");
  
  }

  function setup() {
    
    createCanvas(1600, 800);
    
   
    invisibleGround = createSprite(200,600,400,20);
    
    ground = createSprite(200,180,400,20);
    ground.addImage(groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -20;
   

    player = createSprite(350,600,20,50);
    player.addImage(playerImg);
    player.scale = 0.3;

    
    
    animalsGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;
  }

function draw() {
  background(255);

  console.log(animals);
  player.collide(invisibleGround);
  if (gameState===PLAY){
    
    if(keyDown("space") && player.y >= 500) {
      
      player.velocityY = -14;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 
     spawnAnimals();
    spawnObstacles();

    player.setCollider("circle",100,20,255);
   if(obstaclesGroup.isTouching(player)){
      gameState = END;
      text("Animals Saved: "+ animals, displayWidth/2,displayHeight/2);

    }
    if(animalsGroup.isTouching(player)){
      animals = animals
      animals +=1;


  
    }

  }
  else if (gameState === END) {
    
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    animalsGroup.setVelocityXEach(0);
    
    
    
    obstaclesGroup.setLifetimeEach(-1);
    animalsGroup.setLifetimeEach(-1);

   

  

   
  }
  
  
  drawSprites();
}

function spawnAnimals() {
  if (frameCount % 50 === 0) {
    var animal = createSprite(1200,120,40,10);
    animal.y = Math.round(random(400,600));
    var rand1 = Math.round(random(1,3));
 
    switch(rand1) {
      case 1:  animal.addImage(animal3Image);
              break;
      case 2: animal.addImage(animal2Image);
              break;
      case 3:  animal.addImage(animal1Image);
              break;
      default: break;
    }
 
    animal.scale = 0.5;
    animal.velocityX = -15;
    

    animal.lifetime =50;
    
    animal.depth = player.depth;
    player.depth = player.depth + 1;
    
   
    animalsGroup.add(animal);
  }
  
}

function spawnObstacles() {
  if(frameCount % 55 === 0) {
    var obstacle = createSprite(1200,505,10,40);
    obstacle.y =600;
    obstacle.velocityX = -25;
    

    var rand2 = Math.round(random(1,3));
   switch(rand2) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
  
    obstacle.scale = 0.5;
    obstacle.lifetime = 250;
   
    obstaclesGroup.add(obstacle);
  }
}




