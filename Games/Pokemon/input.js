export class Input {
    constructor() {
        /*this.keyLeft = false;
        this.keyDown = false;
        this.keyRight = false;
        this.keyUp = false;
        window.addEventListener('keydown', e => {
            this.keyLeft = this.keyLeft || (e.key === 'a'); 
            this.keyDown =  this.keyDown || (e.key === 's'); 
            this.keyRight = this.keyRight || (e.key === 'd'); 
            this.keyUp = this.keyUp || (e.key === 'w');
        });
        window.addEventListener('keyup', e => {
            this.keyLeft = this.keyLeft && !(e.key === 'a'); 
            this.keyDown = this.keyDown && !(e.key === 's'); 
            this.keyRight = this.keyRight && !(e.key === 'd'); 
            this.keyUp = this.keyUp && !(e.key === 'w');
        });*/
        canvas.addEventListener('click', function(event) {
            var x = event.clientX; 
            var y = event.clientY; 
        }, false); 
    }
}