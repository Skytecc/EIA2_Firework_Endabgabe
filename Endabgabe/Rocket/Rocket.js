"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Rocket {
        position;
        // dx, dy are the destination x and y position 
        dx;
        dy;
        size;
        name;
        color1;
        color2;
        alpha;
        //public explosion: Vector;
        constructor(_position, _dx, _dy, _size, _name, _color1, _color2) {
            this.position = _position;
            this.dx = _dx;
            this.dy = _dy;
            this.size = _size;
            this.name = _name;
            this.color1 = _color1;
            this.color2 = _color2;
            this.alpha = 1;
        }
    }
    Feuerwerk.Rocket = Rocket;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Rocket.js.map