let fireSound;
let pointSound;
// class Aim{
  //   constructor(){
    //     this.width = 50;
    //     this.height =  50;
    //     this.detailX = 0;
    //   }
  
    //   draw(mouseX, mouseY){
      //     noFill();
//     ellipse(mouseX , mouseY, this.width, this.height, this.detailX)
//   }
// }

// const aim = new Aim();

const player = {
  x: 0,
  y: 460,
  width: 40,
  height: 40,
  velocity: 15.5,
  score: 0,
  
  draw: ({ x, y, width, height }) =>{
    textAlign('right');
    fill('white');
    textSize(50);
    text(parseInt(player.score), 260, 50);
    
    fill('white')
    rect(x, y, width, height);
  },
  
  _addScore(){
    this.score++;
  },
  
  scoreDamage(height){
    if((enemie.x + enemie.width > bull.x && bull.x > enemie.x) 
    && (enemie.y + enemie.height > bull.y && bull.y > enemie.y)){
      
      pointSound.play();

      this._addScore();
      enemie.y = -10
      enemie.x = Math.floor(Math.random() * (height - 0) + 0)
      enemie.velocity = Math.floor(Math.random() * (enemie.maxVelocity - 1) + 1)
      
      bull.y = -height;

      console.log("[scoreDamage] Você Marcou um ponto!")
    }
  }
}

class Bullet{
  constructor(width, height){
    this.x = -width;
    this.y = -height;
    this.width = width;
    this.height = height;
    
    this.velocity = 10;
  }
  
  draw(){
    fill('red')
    rect(this.x,this.y,this.width,this.height)
    // console.log('de');
  }
  
  fire(x,y){
    if(this.y < -1){
      fireSound.play();
      this.x = x;
      this.y = y;
    }
  }
  
  movingBullet(){
    if(this.y !== -this.height){
      this.y -= this.velocity;
    }
  }
}

const bull = new Bullet(2, 30)

class Enemie{
  
  constructor(width, height, velocity){
    this.x = 30
    this.y = -10
    this.width = width;
    this.height = height;
    
    this.velocity = 1;
    this.maxVelocity = velocity;
  }
  
  draw(height){
    if(this.y > height){
      this.y = -10;
      enemie.x = Math.floor(Math.random() * (height - 2) + 1)
      
      enemie.velocity = Math.floor(Math.random() * (enemie.maxVelocity - 1) + 1)
      rect(this.x, this.y, this.width, this.height);
    }else{
      this.y += this.velocity
      rect(this.x, this.y, this.width, this.height);
    }
  }
}

const enemie = new Enemie(20,20, 10);

const keys = {
  ArrowLeft: () => {
    if(player.x !== 0){
      player.x-=player.velocity;
    }
    
    console.log('[ArrowLeft] Foi pressionado!')
  },
  a: () => {
    if(player.x !== 0){
      player.x-=player.velocity;
    }
    
    console.log('[a] Foi pressionado!')
  },
  ArrowRight: () => {
    if(player.x + player.width !== width){
      player.x += player.velocity;
      
      console.log('[ArrowRight] Foi pressionado!');
    }
  },
  d: () => {
    if(player.x + player.width !== width){
      player.x+=player.velocity;
      
      console.log('[d] Foi pressionado!')
    }
  },
  Space: () =>{
    bull.fire(player.x + player.width/2, player.y)
  }
}

function preload(){
  
}

function setup(){
  createCanvas(500,500);

  fireSound = loadSound("./sounds/fire.mp3");
  pointSound = loadSound("./sounds/point.mp3");
}

onkeydown = (event) => {
  console.clear()
  
  const { key } = event;
  
  if(key === ' '){
    keys['Space']()
  }
  
  console.log(`>>>>>>>>   ${key}   <<<<<<<<`)
  
  if(keys[key]){
    keys[key]();
  }
}

function draw(){
  background('gray')
  
  bull.draw();
  bull.movingBullet();
  
  // aim.draw(mouseX, mouseY)
  
  enemie.draw(height);

  player.draw(player);
  player.scoreDamage(height);
}