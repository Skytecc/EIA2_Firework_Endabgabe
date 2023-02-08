"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Line extends Feuerwerk.Rocket {
        constructor(_position, _name, _color1, _color2) {
            super(_position, _name, _color1, _color2);
            this.draw();
        }
        draw() {
            Feuerwerk.crc2.beginPath();
            // move to the last tracked coordinate in the set, then draw a line to the current x and y
            Feuerwerk.crc2.moveTo();
            Feuerwerk.crc2.lineTo(this.position.x, this.position.y);
            Feuerwerk.crc2.strokeStyle = "black";
            Feuerwerk.crc2.stroke();
            Feuerwerk.crc2.beginPath();
            // draw the target for this firework with a pulsing circle
            Feuerwerk.crc2.stroke();
        }
        static test() {
        }
    }
    Feuerwerk.Line = Line;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Line.js.map