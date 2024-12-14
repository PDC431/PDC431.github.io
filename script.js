const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'blue';

class Ball {
    constructor(effect){
        this.effect = effect;
        this.x = this.effect.width * 0.5;
        this.y = this.effect.height * 0.5;
        this.radius = 16;
        this.speedX = Math.random() * 0.5;
        this.speedY = Math.random() * 0.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

class MetaBallsEffect {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.metaballsArray = [];
    }
    init(numberOfBalls){
        for (let i = 0; i < numberOfBalls; i++){
            this.metaballsArray.push(new Ball(this));
        }
    }

    update(){
        this.metaballsArray.forEach(metaball => metaball.update());
    }
    draw(context){
        this.metaballsArray.forEach(metaball => metaball.draw(context));
    }
}

const effect = new MetaBallsEffect(canvas.width, canvas.height);
effect.init(20);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(animate);
}
animate();
