const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

let score = 0;

const tractor = {
    x:50,
    y:180,
    w:60,
    h:60,
    speed:6
};

const fruit = {
    x:600,
    y:Math.random()*340,
    w:40,
    h:40
};

const trash = {
    x:450,
    y:Math.random()*340,
    w:40,
    h:40
};

const keys={};

document.addEventListener("keydown",(e)=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",(e)=>{
    keys[e.key]=false;
});

function drawTractor(){

    ctx.fillStyle="green";
    ctx.fillRect(tractor.x,tractor.y,tractor.w,tractor.h);

    ctx.fillStyle="black";

    ctx.beginPath();
    ctx.arc(tractor.x+12,tractor.y+58,8,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(tractor.x+48,tractor.y+58,8,0,Math.PI*2);
    ctx.fill();

}

function drawFruit(){
    ctx.font="35px Arial";
    ctx.fillText("🍎",fruit.x,fruit.y+30);
}

function drawTrash(){
    ctx.font="35px Arial";
    ctx.fillText("🗑️",trash.x,trash.y+30);
}

function update(){

    if(keys["ArrowUp"]) tractor.y-=tractor.speed;
    if(keys["ArrowDown"]) tractor.y+=tractor.speed;
    if(keys["ArrowLeft"]) tractor.x-=tractor.speed;
    if(keys["ArrowRight"]) tractor.x+=tractor.speed;

    tractor.x=Math.max(0,Math.min(canvas.width-tractor.w,tractor.x));
    tractor.y=Math.max(0,Math.min(canvas.height-tractor.h,tractor.y));

    if(
        tractor.x<fruit.x+fruit.w &&
        tractor.x+tractor.w>fruit.x &&
        tractor.y<fruit.y+fruit.h &&
        tractor.y+tractor.h>fruit.y
    ){

        score++;
        scoreText.textContent=score;

        fruit.x=Math.random()*640;
        fruit.y=Math.random()*340;

    }

    if(
        tractor.x<trash.x+trash.w &&
        tractor.x+tractor.w>trash.x &&
        tractor.y<trash.y+trash.h &&
        tractor.y+tractor.h>trash.y
    ){

        score--;

        if(score<0) score=0;

        scoreText.textContent=score;

        trash.x=Math.random()*640;
        trash.y=Math.random()*340;

    }

}

function game(){

    ctx.clearRect(0,0,700,400);

    drawTractor();
    drawFruit();
    drawTrash();

    update();

    requestAnimationFrame(game);

}

game();
