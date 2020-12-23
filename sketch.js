const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var bg = "sprites/bg2.jpg";
var gameState = "onSling";
var score = 0;

function preload() {
    getBackground();
}
function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
    background(backgroundImg);
    }
    textSize(30);
    text("score "+score ,width-300,50);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display(); 
    //getTime();   
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       // slingshot.attach(bird.body);
    }
}

 function getBackground(){

    //var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Seoul");
    //var responseJSON = await response.json();

    var jsonres = {"abbreviation":"JST","client_ip":"112.133.236.66","datetime":"2020-12-23T23:21:19.143776+09:00","day_of_week":3,"day_of_year":358,"dst":false,"dst_from":null,"dst_offset":0,"dst_until":null,"raw_offset":32400,"timezone":"Asia/Tokyo","unixtime":1608733279,"utc_datetime":"2020-12-23T14:21:19.143776+00:00","utc_offset":"+09:00","week_number":52};
    var datetime = jsonres.datetime;
    var hr = datetime.slice(11,13);
    console.log(hr);
    if(hr>=6 && hr <=19){
        bg = "sprites/bg.png";
      }
      if(hr >= 19 && hr <= 6){
          bg = "sprites/bg2.jpg";
      }
      backgroundImg = loadImage(bg);

}