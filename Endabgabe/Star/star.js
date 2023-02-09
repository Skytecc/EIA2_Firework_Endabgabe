"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Line extends Feuerwerk.Rocket {
        constructor(_position, _dx, _dy, _size, _name, _color1, _color2) {
            super(_position, _dx, _dy, _size, _name, _color1, _color2);
        }
        draw() {
            Feuerwerk.crc2.save();
            //this.drawLine(this.position.x, this.position.y, this.position.x, this.position.y + 10, this.color1);
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 15, this.position.y - 190, this.position.x + 22.5, this.position.y - 170, this.color1); // oben
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 0, this.position.y - 155, this.position.x + 22.5, this.position.y - 170, this.color1); // unten links
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 30, this.position.y - 155, this.position.x + 22.5, this.position.y - 170, this.color1); // unten rechts
            this.drawTriangle(this.position.x + 15, this.position.y - 175, this.position.x + 15, this.position.y - 165, this.position.x - 7.5, this.position.y - 180, this.color1); // links
            this.drawTriangle(this.position.x + 15, this.position.y - 175, this.position.x + 15, this.position.y - 165, this.position.x + 35, this.position.y - 180, this.color1); // rechts 
            Feuerwerk.crc2.restore();
        }
        explode() {
            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }
        drawTriangle(_x1, _y1, _x2, _y2, _x3, _y3, _color) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.moveTo(_x1, _y1);
            Feuerwerk.crc2.lineTo(_x2, _y2);
            Feuerwerk.crc2.lineTo(_x3, _y3);
            Feuerwerk.crc2.fillStyle = _color;
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.closePath();
        }
    }
    Feuerwerk.Line = Line;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=star.js.map