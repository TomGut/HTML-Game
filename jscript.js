let myTitle;
let myStart;
let myBackground;
let myMaja;
let myMusic;
let mySound;
let mySmash;
let myBoing;
let myFuneral;
let myApplause;
let myIntro;
let mySun;
let myFlower;
let myFuneralStone;
let myFuneralYes;
let myFuneralNo;
let score = 0;
let lives = 5;
let myBees = [];
let myClouds = [];
let myRainClouds = [];
let myMisc = [];

function startGame() {
    myBackground = new component(1100, 350, 'images/back.png', 0, 280, 'background');
    myTitle = new component(300, 200, 'images/game.png', 350, 50, 'image');
    myStart = new component(200, 200, 'images/yes2.png', 400, 350, 'image');
    myMaja = new component(120, 75, 'images/bee.gif', 100, 200, 'image');
    myIntro = new sound('sounds/intro.mp3');
    myMusic = new sound('sounds/music.mp3');
    mySound = new sound('sounds/bee.wav');
    mySmash = new sound('sounds/smash.mp3');
    myBoing = new sound('sounds/blurp.wav');
    myApplause = new sound('sounds/applause.wav');
    myFuneralSound = new sound('sounds/funeral.mp3');
    myFuneralStone = new component(200, 200, 'images/funeral.png', 400, 100, 'image');
    myFuneralYes = new component(100, 100, 'images/yes.png', 300, 400, 'image');
    myFuneralNo = new component(100, 100, 'images/no.png', 600, 400, 'image');
    mySun = new component(200, 200, 'images/sun.png', 840, -40, 'image');
    myFlower = new component(150, 460, 'images/flower.png', 500, 200, 'image');
    myGameArea.start();
    myGameArea.menu();
    myGameArea.intervalMenu();
}

const myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[2]);
        this.frameNo = 0;
        },
    menu: function() {
        menuStart();
    },
    intervalGame: function() {
        this.interval = setInterval(updateGameArea, 20);
    },
    intervalMenu: function() {
         this.interval = setInterval(menuStart, 100);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function(){
        clearInterval(this.interval)
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == 'image' || type == 'background' || type == 'obstacle' || type == 'misc') {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;   
    this.speedX = 0;
    this.speedY = 0; 
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == 'image' || type == 'background' || type == 'obstacle' || type == 'misc') {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height)
            
             if (type == 'background') {
                ctx.drawImage(this.image,
                this.x + this.width, this.y, this.width, this.height);
             }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;     
        if (this.type == 'background') {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
        }
    };
    this.hitWall = function() {
        const borderVertical = myGameArea.canvas.height - this.height;
        const borderHorizontal = myGameArea.canvas.width - this.width;
        if (this.y > borderVertical) {
            this.y = borderVertical;
            this.speedY -= this.speedY;
        }if(this.y <=0 ){
            this.y = myGameArea.canvas.y == 0;
            this.speedY -= this.speedY;
        }if(this.x > borderHorizontal){
            this.x = borderHorizontal;
            this.speedX -= this.speedX;
        }if(this.x <= 0){
            this.x = myGameArea.canvas.x == 0;
            this.speedX -= this.speedX;
        }
    };
    this.crashWith = function(otherobj) {
        const myleft = this.x;
        const myright = this.x + (this.width);
        const mytop = this.y;
        const mybottom = this.y + (this.height);
        const otherleft = otherobj.x + 30;
        const otherright = otherobj.x + (otherobj.width) - 20;
        const othertop = otherobj.y + 10;
        const otherbottom = otherobj.y + (otherobj.height) - 25;
        let crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    };
};

function sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
} 

function drawScore(){
    ctx = myGameArea.context;
    
    ctx.font = '30px Serif';
    ctx.fillStyle = 'red';
    ctx.fillText('Punkty: ' + score, 20, 30);
}

function drawLives(){
    ctx = myGameArea.context;
    
    ctx.font = '30px Serif';
    ctx.fillStyle = 'red';
    ctx.fillText('Życia: ' + lives, 200, 30);
}

function drawNextTry(){
    ctx = myGameArea.context;
    
    ctx.font = '50px Serif';
    ctx.fillStyle = 'red';
    ctx.fillText('Przygotuj się do następnej próby !!', 200, 200);
}

function gameOver(){
    myGameArea.clear();
    ctx = myGameArea.context;
    
    ctx.font = '50px Serif';
    ctx.fillStyle = 'red';
    ctx.fillText('Wszystkie życia stracone ! Koniec Gry !', 90, 100);
    
    ctx.font = '30px Serif';
    ctx.fillStyle = 'red';
    ctx.fillText('Chcesz zagrać jeszcze raz ?', 330, 350);
    
    myMusic.stop();
    myMaja.image.s
    myFuneralSound.play();
    myFuneralStone.update();
    myFuneralYes.update();
    myFuneralNo.update();
}

function goodBye() {
    myGameArea.clear();
    mySound.stop();
    myFuneralSound.stop();
    myApplause.play();
    
    ctx = myGameArea.context;
    
    ctx.font = '100px Serif';
    ctx.fillStyle = 'red';
    ctx.fillText('Żegnaj', 360, 200);
    
    ctx.font = '40px Serif';
    ctx.fillStyle = 'red';
        
    const grat = ' - całkiem nieźle !'
    const bad = ', musisz jeszcze popracować'
    
        if(score >= 200){
            ctx.fillText('Twój wynik to: ' + score + ' punktów' + grat, 100, 350);
        }else{
            ctx.fillText('Twój wynik to: ' + score + ' punktów' + bad, 50, 350);
        }
}

function stopped(){
    myMaja.x = 100;
    myMaja.y = 200;
    myMaja.speedX = 0;
    myMaja.speedY = 0;
    myMaja.image.src = 'images/bee.gif';
        
        if(lives <= 0){
            myGameArea.stop();
            gameOver();
        }else if(points >= 1000){
            goodBye();
        }
}

function reload() {
    location.reload();
}

function menuStart() {
    myGameArea.clear();
    myIntro.play();
    myTitle.update();
    myStart.update();
}

function updateGameArea() {
    
    myGameArea.clear();
    myIntro.stop();
    mySound.play();
    myMusic.play();
    myBackground.newPos();    
    myBackground.update();  
    myMaja.update();
    myMaja.newPos();
    myMaja.hitWall();
    myFlower.update();
    myFlower.newPos();
    mySun.update();
    mySun.newPos();

    drawScore();
    drawLives();

    myBackground.speedX = -1;
    mySun.speedX = -0.07;
    myFlower.speedX = -1;
        
        let x, y;
        const time = 0.01;
    
        for (i = 0; i < myBees.length; i += 1) {
            if (myMaja.crashWith(myBees[i])) {
                myMaja.image.src = 'images/poof.png';
                myMaja.speedX = -myMaja.speedX * time;
                myMaja.speedY = -myMaja.speedY * time;
                //(myBees[i]).image.src = 'images/explode.png';
                mySound.stop();
                myMusic.stop();
                mySmash.play();
                lives--;
                score -= 20;
                myBees.splice(i, 1);
                setTimeout(stopped, 500);
            }
            
        }for (i = 0; i < myRainClouds.length; i += 1) {
            if (myMaja.crashWith(myRainClouds[i])) {
                myMaja.image.src = 'images/poof.png';
                myMaja.speedX = -myMaja.speedX * time;
                myMaja.speedY = -myMaja.speedY * time;
                //(myRainClouds[i]).image.src = 'images/explode.png';
                mySound.stop();
                myMusic.stop();
                mySmash.play();
                lives--;
                score -= 50;
                myRainClouds.splice(i, 1);
                setTimeout(stopped, 500);
            }
        }for (i = 0; i < myMisc.length; i += 1) {
            if (myMaja.crashWith(myMisc[i])) {
                myBoing.play();
                myMaja.update();
                score += 50;
                myMisc.splice(i,1);
            }
        }
    
         myGameArea.frameNo += 1;
         x = myGameArea.canvas.width;
        

        if (everyinterval(250)){
            minHeight = 10;
            maxHeight = 500;
            gap = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            y = maxHeight - gap;
            myBees.push(new component(80, 100, 'images/bumblee.png', x, y, 'obstacle'));
        }if (everyinterval(450)) {
            maxHeightCloud = 150;
            gapCloud = Math.floor(Math.random()*(maxHeightCloud-minHeight+1)+minHeight);
            cloudY = maxHeightCloud - gapCloud;
            myClouds.push(new component(100, 100, 'images/cloud.png', x, cloudY, 'image'));
        }if (everyinterval(800)) {
            minHeight = 10;
            maxHeightCloud = 150;
            gapCloud = Math.floor(Math.random()*(maxHeightCloud-minHeight+1)+minHeight);
            cloudY = maxHeightCloud - gapCloud;
            myRainClouds.push(new component(100, 100, 'images/rain.png', x, cloudY, 'obstacle'));
        }if (everyinterval(400)) {
            minHeight = 10;
            maxHeightMisc = 300;
            gapMisc = Math.floor(Math.random()*(maxHeightMisc-minHeight+1)+minHeight);
            miscY = maxHeightMisc - gapMisc;
            myMisc.push(new component(100, 100, 'images/honey.png', x, miscY, 'misc'));
        }

        for (i = 0; i < myBees.length; i += 1) {
            myBees[i].x += -3;
            myBees[i].update();
        }for (i = 0; i < myClouds.length; i += 1) {
            myClouds[i].x += -0.7;
            myClouds[i].update();
        }for (i = 0; i < myRainClouds.length; i += 1) {
            myRainClouds[i].x += -0.4;
            myRainClouds[i].update();
        }for (i = 0; i < myMisc.length; i += 1) {
            myMisc[i].x += -0.8;
            myMisc[i].update();
        } 
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function move(e){
    
    let keyNo = e.keyCode;
    
    if(keyNo === 81 || keyNo === 38){
        myMaja.speedY -= 0.2;
    }else if(keyNo === 65 || keyNo === 40){
        myMaja.speedY += 0.2;
    }else if(keyNo === 188 || keyNo === 37){
        myMaja.speedX -= 0.2;
    }else if(keyNo === 190 || keyNo === 39){
        myMaja.speedX += 0.2;
    }
}

window.addEventListener('keydown', move);


function endGameQuestion(e){
    
    const pos = {
        x: e.clientX,
        y: e.clientY
    };
  
    if (pos.x >= (myGameArea.canvas.offsetLeft + myFuneralYes.x) && pos.x <= (myGameArea.canvas.offsetLeft + (myFuneralYes.x + myFuneralYes.width)) ) {
        myBoing.play();
        setTimeout(reload, 700);
    }else if (pos.x >= (myGameArea.canvas.offsetLeft + myFuneralNo.x) && pos.x <= (myGameArea.canvas.offsetLeft + (myFuneralNo.x + myFuneralNo.width)) ) {
        myBoing.play();
        goodBye();     
    }else if (pos.x >= (myGameArea.canvas.offsetLeft + myStart.x) && pos.x <= (myGameArea.canvas.offsetLeft + (myStart.x + myStart.width)) ) {
        myBoing.play();
        myGameArea.stop();
        myGameArea.intervalGame();
    }
}

myGameArea.canvas.addEventListener('click', endGameQuestion);