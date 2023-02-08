namespace Feuerwerk {
    export abstract class Rocket {

        public position: Vector;
        // dx, dy are the destination x and y position 
        public dx: number; 
        public dy: number;
        public size: number;
        public name: string;
        public color1: string;
        public color2: string;
        public alpha: number;
        //public explosion: Vector;

        constructor(_position: Vector, _dx: number, _dy: number, _size: number, _name: string, _color1: string, _color2: string) {
            this.position = _position;
            this.dx = _dx;
            this.dy = _dy;
            this.size = _size;
            this.name = _name;
            this.color1 = _color1;
            this.color2 = _color2;
            this.alpha = 1;
        }

        public abstract draw(): void;

        public abstract explode(): void;

    }
}