"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Star extends Feuerwerk.Rocket {
        constructor(_position, _dx, _dy, _alphaTime, _name, _color) {
            super(_position, _dx, _dy, _alphaTime, _name, _color);
        }
        draw() {
            Feuerwerk.crc2.save();
            Feuerwerk.crc2.translate(-20, 180);
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 15, this.position.y - 190, this.position.x + 22.5, this.position.y - 170); // oben
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 15, this.position.y - 190, this.position.x + 22.5, this.position.y - 170); // oben
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 0, this.position.y - 155, this.position.x + 22.5, this.position.y - 170); // unten links
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 30, this.position.y - 155, this.position.x + 22.5, this.position.y - 170); // unten rechts
            this.drawTriangle(this.position.x + 15, this.position.y - 175, this.position.x + 15, this.position.y - 165, this.position.x - 7.5, this.position.y - 180); // links
            this.drawTriangle(this.position.x + 15, this.position.y - 175, this.position.x + 15, this.position.y - 165, this.position.x + 35, this.position.y - 180); // rechts 
            Feuerwerk.crc2.restore();
        }
        explode() {
            super.explode();
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
    Feuerwerk.Star = Star;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Star2.js.map