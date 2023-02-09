namespace Feuerwerk {
    export class Circle extends Rocket {

        private radius: number;

        constructor(_position: Vector, _dx: number, _dy: number, _alphaTime: number, _name: string, _color: string) {
            super(_position, _dx, _dy, _alphaTime , _name, _color);

            this.radius = 5;

        }

        public draw(): void {

            crc2.save();

            this.drawArc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);

            crc2.restore();

            //console.log("Ich werde gezeichnet!");

        }

        public explode(): void {
            this.draw();
            this.alpha -= this.alphaTime / 100;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }


        public drawArc(_x: number, _y: number, _radius: number, _startAngle: number, _endAngle: number): void {

            crc2.beginPath();
            crc2.globalAlpha = this.alpha;
            crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.save();
            crc2.closePath();
        }

    }

}