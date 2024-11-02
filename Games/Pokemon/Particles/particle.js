export class Particle {
    #x;
    #y;
    #direction;
    #turn;
    #speed;
    #acceleration;
    #size;
    #growth;
    #color;
    #colorshift;
    #angle;
    #rotation;
    #age;
    //(#animationSpeed)
    #animationEnd;
    #death;
    constructor() {
        this.#x = 0;
        this.#y = 0;
        this.#direction = 0;
        this.#turn = 0;
        this.#speed = 0;
        this.#acceleration = 0;

        this.#size = 64;
        this.#growth = 0;
        this.#color = 'rgba(0, 0, 0, 1)';
        this.#colorshift = 'rgba(0, 0, 0, 0)'
        this.#angle = 0;
        this.#rotation = 0;
        this.#age = 0;
        this.#death = 99999;
        this.#animationEnd = 120;
    }

    update() {
        this.#age += 1;

        if (this.#age <= this.#animationEnd) {
            this.#direction += this.#turn;
            this.#size += this.#growth;
            this.#speed += this.#acceleration;
            this.#angle += this.#rotation;
            if (this.#colorshift != 'rgba(0, 0, 0, 0)') {
                this.#applyColorshift();
            }
            
            let dirRadian = this.#direction * Math.PI / 180; 
            this.#x += this.#speed * Math.cos(dirRadian);
            this.#y += this.#speed * Math.sin(dirRadian);
        }
    }
    getX() {
        return this.#x;
    }
    setX(x) {
        this.#x = x;
    }
    animateXY(xA, yA, xB, yB) {
        this.setX(xA);
        this.setY(yA);
        var duration = this.getAnimationEnd() - this.getAge();
        var xC = xB - xA;
        var yC = yB - yA;
        var distance = Math.sqrt(xC*xC + yC*yC);
        var dirRadian = Math.atan(yC / xC);
        this.setSpeed(distance / duration);
        this.setDirection(dirRadian * 180 / Math.PI);
    }
    getY() {
        return this.#y;
    }
    setY(y) {
        this.#y = y;
    }
    getDirection() {
        return this.#direction;
    }
    setDirection(direction) {
        this.#direction = direction;
    }
    animateDirection(directionA, directionB) {
        this.setDirection(directionA);
        this.setTurn((directionB - directionA) / (this.getAnimationEnd() - this.getAge()));
    }
    getTurn() {
        return this.#turn;
    }
    setTurn(turn) {
        this.#turn = turn;
    }
    getSpeed() {
        return this.#speed;
    }
    setSpeed(speed) {
        this.#speed = speed;
    }
    animateSpeed(speedA, speedB) {
        this.setSpeed(speedA);
        this.setAcceleration((speedB - speedA) / (this.getAnimationEnd() - this.getAge()));
    }
    getAcceleration() {
        return this.#acceleration;
    }
    setAcceleration(acceleration) {
        this.#acceleration = acceleration;
    }
    getSize() {
        return this.#size;
    }
    setSize(size) {
        this.#size = size;
    }
    animateSize(sizeA, sizeB) {
        this.setSize(sizeA);
        this.setGrowth((sizeB - sizeA) / (this.getAnimationEnd() - this.getAge()));
    }
    getGrowth() {
        return this.#growth;
    }
    setGrowth(growth) {
        this.#growth = growth;
    }
    getColor() {
        return this.#color;
    }
    setColor(color) {
        this.#color = color;
    }
    animateColor(colorA, colorB) {
        this.setColor(colorA); 
        var col1 = colorA.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
        var col2 = colorB.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
        var shift = new Array();
        var duration = this.getAnimationEnd() - this.getAge();
        for (var i in col1) {
            shift[i] = (Number(col2[i]) - Number(col1[i])) / duration;
        }
        this.setColorshift(`rgba(${shift[0]}, ${shift[1]}, ${shift[2]}, ${shift[3]})`);
    }
    getColorshift() {
        return this.#colorshift;
    }
    setColorshift(colorshift) {
        this.#colorshift = colorshift;
    }
    getAngle() {
        return this.#angle;
    }
    setAngle(angle) {
        this.#angle = angle;
    }
    animateAngle(angleA, angleB) {
        this.setAngle(angleA);
        this.setRotation((angleB - angleA) / (this.getAnimationEnd() - this.getAge()));
    }
    getRotation() {
        return this.#rotation;
    }
    setRotation(rotation) {
        this.#rotation = rotation;
    }
    getAge() {
        return this.#age;
    }
    setAge(age) {
        this.#age = age;
    }
    getDeath() {
        return this.#death;
    }
    setDeath(death) {
        this.#death = death;
    }
    getAnimationEnd() {
        return this.#animationEnd;
    }
    setAnimationEnd(animationEnd) {
        this.#animationEnd = animationEnd;
    }
    #applyColorshift() { 
        var color = this.getColor().replace(/^rgba?\(|\s+|\)$/g,'').split(',');
        var shift = this.getColorshift().replace(/^rgba?\(|\s+|\)$/g,'').split(',');
        for(var i in color) {
            color[i] = String(Number(color[i]) + Number(shift[i]));
            var actualValue = Number(color[i]);
            var actualShift = Number(shift[i]);
            if (i != 3) {
                if (actualValue >= 255) { 
                    color[i] = '255'; 
                    shift[i] = String(actualShift * -1);
                }
                if (actualValue <= 0) { 
                    color[i] = '0'; 
                    shift[i] = String(actualShift * -1);
                }
            } 
            else {
                if (actualValue >= 1) { 
                    color[i] = '1'; 
                    shift[i] = String(actualShift * -1);
                }
                if (actualValue <= 0) { 
                    color[i] = '0'; 
                    shift[i] = String(actualShift * -1);
                }
            }
        }
        this.setColor('rgba('+color[0]+','+color[1]+','+color[2]+','+color[3]+')'); 
        this.setColorshift('rgba('+shift[0]+','+shift[1]+','+shift[2]+','+shift[3]+')');
    }
}