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
        // Get Formelements
        let formData = new FormData(document.forms[0]);
        // Get Name
        let name = formData.get("Name");
        // Get Color
        let colorPicker1 = formData.get("Color1");
        let colorPicker2 = formData.get("Color2");
        // alphaTime/Lifetime
        let lifetimeString = formData.get("Lifetime");
        let lifetime = parseInt(lifetimeString);
        // Amount
        let amountString = formData.get("Amount");
        let amount = parseInt(amountString);
        console.log(amount + " hier ist Amount");
        //console.log(colorPicker1);
        // First color Particles
        for (let i = 0; i <= amount; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            let circle = new Feuerwerk.Drop(position, dx, dy, lifetime, name, colorPicker1);
            particles.push(circle);
        }
        // Second color Particles
        for (let i = 0; i <= amount; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            let circle = new Feuerwerk.Drop(position, dx, dy, lifetime, name, colorPicker2);
            particles.push(circle);
            console.log(circle);
        }
    }
    function explosionAnimation() {
        // making particle Animation that it fades and splices from Array
        let canvas = document.querySelector("#canvas");
        Feuerwerk.crc2.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particles) {
            if (particle.alpha <= 0) {
                let index = particles.indexOf(particle);
                particles.splice(index, 1);
            }
            else {
                particle.explode();
            }
        }
        //console.log(particles);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map