"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Rocket {
        position;
        // dx, dy are the destination x and y position 
        dx;
        dy;
        alphaTime;
        name;
        color;
        alpha;
        constructor(_position, _dx, _dy, _alphaTime, _name, _color) {
            this.position = _position;
            this.dx = _dx;
            this.dy = _dy;
            this.alphaTime = _alphaTime;
            this.name = _name;
            this.color = _color;
            this.alpha = 1;
        }
    }
    Feuerwerk.Rocket = Rocket;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Rocket.js.map