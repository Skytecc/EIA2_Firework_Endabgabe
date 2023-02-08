namespace Feuerwerk {
    export class Circle extends Rocket {

        // dx, dy are the destination x and y position 

        private radius: number;
        
        private dx: number;

        private dy: number;
        
        constructor(_position: Vector, _name: string, _color1: string, _color2: string, _radius: number, _dx: number, _dy: number) {
            super(_position, _name, _color1, _color2);

            this.radius = _radius;
            this.dx = _dx;
            this.dy = _dy;
        }

        public update(): void {

            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;


        }

        public draw(): void {

            crc2.save();            
            
            this.drawArc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, "red");

            crc2.restore();
            
            console.log("Ich werde gezeichnet!");

        }


        public drawArc(_x: number, _y: number, _radius: number, _startAngle: number, _endAngle: number, _color: string): void {
            crc2.beginPath();
            crc2.globalAlpha = this.alpha;
            crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            crc2.fillStyle = _color;
            crc2.fill();
            crc2.closePath();
        }

    }

}