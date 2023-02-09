"use strict";
/*
Aufgabe: <Endaufgabe Feuerwerk>
Name: <Cindy Nguyen>
Matrikel: <271131>
Datum: <>
Quellen: <Ann-Kathrin Haas>
*/
var Feuerwerk;
(function (Feuerwerk) {
    let canvas;
    //let rockets: Rocket[] = [];
    let particles = [];
    window.addEventListener("load", handleload);
    function handleload() {
        canvas = document.querySelector("#canvas");
        // Siehe Canvas Lektion
        if (!canvas) {
            return;
        }
        Feuerwerk.crc2 = canvas.getContext("2d");
        console.log("Canvas");
        canvas.addEventListener("click", Rocket);
        window.setInterval(update, 20);
    }
    function update() {
        //Update Funktion
        requestAnimationFrame(explosionAnimation);
    }
    function Rocket(_event) {
        let canvas = document.querySelector("#canvas");
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        console.log(positionX, positionY);
        let rgba1 = Math.floor(Math.random() * 255);
        let rgba2 = Math.floor(Math.random() * 255);
        let rgba3 = Math.floor(Math.random() * 255);
        let color = "RGB" + "(" + rgba1 + "," + rgba2 + "," + rgba3 + ")";
        for (let i = 0; i <= 10; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            let size = 5;
            //
            let circle = new Feuerwerk.Circle(position, dx, dy, size, "testRocket", color, color);
            particles.push(circle);
        }
        console.log(particles);
    }
    function explosionAnimation() {
        // making particle Animation that it fades and splices from Array
        let canvas = document.querySelector("#canvas");
        Feuerwerk.crc2.clearRect(0, 0, canvas.width, canvas.height);
        for (let circle of particles) {
            if (circle.alpha <= 0) {
                let index = particles.indexOf(circle);
                particles.splice(index, 1);
            }
            else {
                circle.explode();
            }
        }
        //console.log(particles);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map