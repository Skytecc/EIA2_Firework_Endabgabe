"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Circle extends Feuerwerk.Rocket {
        radius;
        constructor(_position, _dx, _dy, _alphaTime, _name, _color) {
            super(_position, _dx, _dy, _alphaTime, _name, _color);
            this.radius = 5;
        }
        draw() {
            Feuerwerk.crc2.save();
            this.drawArc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            Feuerwerk.crc2.restore();
            //console.log("Ich werde gezeichnet!");
        }
        explode() {
            this.draw();
            this.alpha -= this.alphaTime / 100;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }
        drawArc(_x, _y, _radius, _startAngle, _endAngle) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.globalAlpha = this.alpha;
            Feuerwerk.crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            Feuerwerk.crc2.fillStyle = this.color;
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.save();
            Feuerwerk.crc2.closePath();
        }
    }
    Feuerwerk.Circle = Circle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Circle.js.map