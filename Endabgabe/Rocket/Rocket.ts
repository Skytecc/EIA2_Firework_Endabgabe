namespace Feuerwerk {
    export abstract class Rocket {

        public position: Vector;
        // dx, dy are the destination x and y position 
        public dx: number; 
        public dy: number;
        public alphaTime: number;
        public name: string;
        public color: string;
        public alpha: number;

        constructor(_position: Vector, _dx: number, _dy: number, _alphaTime: number, _name: string, _color: string) {
            this.position = _position;
            this.dx = _dx;
            this.dy = _dy;
            this.alphaTime = _alphaTime;
            this.name = _name;
            this.color = _color;
            this.alpha = 1;
            
        }

        public abstract draw(): void;

        public explode(): void {
            this.draw();
            this.alpha -= this.alphaTime / 100;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }

    }
}