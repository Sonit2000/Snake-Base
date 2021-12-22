//set Item Snake
class Snake{
    constructor(x,y,size){
        this.x= x
        this.y=y
        this.size = size
        this.tail = [{x:this.x,y:this.y}]
        this.rotateX =0
        this.rotateY=1
    }
    //set move 
    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect ={
                x: this.tail[this.tail.length-1].x + this.size,
                y: this.tail[this.tail.length-1].y
            }
        }else if(this.rotateX == -1){
            newRect ={
                x: this.tail[this.tail.length-1].x - this.size,
                y: this.tail[this.tail.length-1].y
            }
        }
        else if(this.rotateY == 1){
            newRect ={
                x: this.tail[this.tail.length-1].x,
                y: this.tail[this.tail.length-1].y +this.size
            }
        }
        else if(this.rotateY == -1){
            newRect ={
                x: this.tail[this.tail.length-1].x ,
                y: this.tail[this.tail.length-1].y-this.size
            }
        }
        this.tail.shift()
        this.tail.push(newRect)
    }
}
//set item Apple
class Apple{
    constructor(){
       var isTouching;
       while(true){
           isTouching=false
           this.x = Math.floor(Math.random() * canvas.width/ snakes.size)*snakes.size
           this.y = Math.floor(Math.random() * canvas.height/ snakes.size)*snakes.size
           for(var i=0;i< snakes.tail.length;i++){
               if(this.x == snakes.tail[i].x && this.y == snakes.tail[i].y){
                   isTouching=true;
               }
           }
           console.log(this.x,this.y)
           this.color="red"
           this.size=snakes.size
           if(!isTouching){
               break;
           }
        }
    }
}

const canvas = document.getElementById("canvas");

var snakes = new Snake(20,20,20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d');

window.onload = ()=>{
    gameLoop();
}
function gameLoop(){
    setInterval(show,1000/20); 
}
function show(){
    update();
    draw();
}
 
function update(){
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
    console.log("update");
    snakes.move();
    eatApple();
    checkHitWall();
}
function eatApple(){
    if(snakes.tail[snakes.tail.length-1].x == apple.x && 
        snakes.tail[snakes.tail.length-1].y == apple.y){
        snakes.tail[snakes.tail.length]={x:apple.x,y:apple.y}
        apple = new Apple();
    }
}
function checkHitWall(){
    var headTail = snakes.tail[snakes.tail.length-1]
    if(headTail.x == - snakes.size){
        headTail.x = canvas.width - snakes.size
    }
    else if(headTail.x == canvas.width){
         headTail.x=0
    }
    else if(headTail.y == - snakes.size){
        headTail.y =  canvas.height - snakes.size
    }
    else if(headTail.y == canvas.height){
        headTail.y = 0
    }
}

function draw(){
    creatRect(0,0,canvas.width,canvas.height,"black");
    creatRect(0,0,canvas.width,canvas.height);
    for(var i=0; i<snakes.tail.length;i++){
        creatRect(snakes.tail[i].x+2.5,snakes.tail[i].y+2.5,snakes.size-5,snakes.size-5,"White")
    }
    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snakes.tail.length - 1),canvas.width-120,18);
    creatRect(apple.x,apple.y,apple.size,apple.size,apple.color)

}
function creatRect(x,y,width,height,color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}
window.addEventListener("keydown",(event)=>{
    console.log(event.keyCode)
    setTimeout(()=>{
        if(event.keyCode == 37 && snakes.rotateX != 1){
            snakes.rotateX = -1
            snakes.rotateY = 0;
        }else if(event.keyCode == 38 && snakes.rotateY != 1){
            snakes.rotateX = 0
            snakes.rotateY = -1;
        }else if(event.keyCode == 39 && snakes.rotateX != -1){
            snakes.rotateX = 1
            snakes.rotateY = 0;
        }
        else if(event.keyCode == 40 && snakes.rotateY != -1){
            snakes.rotateX = 0
            snakes.rotateY = 1;
        }
    }, 1)
})
