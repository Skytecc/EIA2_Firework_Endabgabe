"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Line extends Feuerwerk.Rocket {
        constructor(_position, _dx, _dy, _size, _name, _color1, _color2) {
            super(_position, _dx, _dy, _size, _name, _color1, _color2);
        }
        draw() {
            //
        }
        explode() {
            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }
    }
    Feuerwerk.Line = Line;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Line.js.map