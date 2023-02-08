namespace Feuerwerk {
    export class Line extends Rocket {

        constructor(_position: Vector, _name: string, _color1: string, _color2: string) {
            super(_position, _name, _color1, _color2);

            this.draw();

        }

        public draw(): void {

            crc2.beginPath();
            // move to the last tracked coordinate in the set, then draw a line to the current x and y
            crc2.moveTo();
            crc2.lineTo(this.position.x, this.position.y);
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.beginPath();
            // draw the target for this firework with a pulsing circle
            crc2.stroke();
        }

        static test(): void {

        }
    }
}