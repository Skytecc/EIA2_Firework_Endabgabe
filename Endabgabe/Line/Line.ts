namespace Feuerwerk {
    export class Line extends Rocket {

        constructor(_position: Vector, _dx: number, _dy: number, _size: number , _name: string, _color1: string, _color2: string) {
            super(_position, _dx, _dy, _size , _name, _color1, _color2);
        }

        public draw(): void {
            //
        }

        public explode(): void {
            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }
    }
}