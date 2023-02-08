"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Circle extends Feuerwerk.Rocket {
        // dx, dy are the destination x and y position 
        radius;
        dx;
        dy;
        constructor(_position, _name, _color1, _color2, _radius, _dx, _dy) {
            super(_position, _name, _color1, _color2);
            this.radius = _radius;
            this.dx = _dx;
            this.dy = _dy;
        }
        update() {
            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }
        draw() {
            Feuerwerk.crc2.save();
            this.drawArc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, "red");
            Feuerwerk.crc2.restore();
            console.log("Ich werde gezeichnet!");
        }
        drawArc(_x, _y, _radius, _startAngle, _endAngle, _color) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.globalAlpha = this.alpha;
            Feuerwerk.crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            Feuerwerk.crc2.fillStyle = _color;
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.closePath();
        }
    }
    Feuerwerk.Circle = Circle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Circle.js.map