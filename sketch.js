var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var fed,lastFed;
var foodObj;
var fireBase;
var feedbtn


//create feed and lastFed variable here




function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
  feedbtn=createButton("FEED THE DOG");
  feedbtn.position(650,95);
  feedbtn.mousePressed(feedDog);
  
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
   feedTime=database.ref('FeedTime');
   feedTime.on("value",function(data){
     lastFed=data.val()
   })
   fill("blue")
   textSize(17);
  //write code to display text lastFed time here
  if(lastFed>=12){
   text("LAST FEED :"+(lastFed-12)+"PM",300,30);
  }else if(lastFed==0){
    text("LAST FEED :12AM ",300,30);
  }else{
    text("LAST FEED :"+lastFed+"AM",300,30);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStk=foodObj.getFoodStock();
 if(foodStk<=0){
  foodObj.updateFoodStock(0);
 }else{
   foodObj.updateFoodStock(foodStk-1);
 }

 
  //write code here to update food stock and last fed timz
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
     
   })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
