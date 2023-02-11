"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Drop extends Feuerwerk.Rocket {
        radius;
        constructor(_position, _dx, _dy, _alphaTime, _name, _color) {
            super(_position, _dx, _dy, _alphaTime, _name, _color);
            this.radius = 5;
        }
        draw() {
            Feuerwerk.crc2.save();
            this.drawArc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            this.drawTriangle(this.position.x - 3, this.position.y - 4, this.position.x + 3, this.position.y - 4, this.position.x + 0, this.position.y - 10);
            Feuerwerk.crc2.restore();
            //console.log("draw");
        }
        explode() {
            super.explode();
        }
        drawArc(_x, _y, _radius, _startAngle, _endAngle) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.globalAlpha = this.alpha;
            Feuerwerk.crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            Feuerwerk.crc2.fillStyle = this.color;
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.closePath();
            //console.log("draw arc");
        }
        drawTriangle(_x1, _y1, _x2, _y2, _x3, _y3) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.globalAlpha = this.alpha;
            Feuerwerk.crc2.moveTo(_x1, _y1);
            Feuerwerk.crc2.lineTo(_x2, _y2);
            Feuerwerk.crc2.lineTo(_x3, _y3);
            Feuerwerk.crc2.fillStyle = this.color;
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.closePath();
        }
    }
    Feuerwerk.Drop = Drop;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Drop.js.map