"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Rocket {
        position;
        name;
        color1;
        color2;
        //public explosion: Vector;
        constructor(_position, _name, _color1, _color2) {
            this.position = _position;
            this.name = _name;
            this.color1 = _color1;
            this.color2 = _color2;
            //this.explosion = _explosion;
        }
    }
    Feuerwerk.Rocket = Rocket;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Rocket.js.map