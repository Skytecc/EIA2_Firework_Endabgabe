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
    let SHAPE;
    (function (SHAPE) {
        SHAPE[SHAPE["CIRCLE"] = 0] = "CIRCLE";
        SHAPE[SHAPE["DROP"] = 1] = "DROP";
        SHAPE[SHAPE["STAR"] = 2] = "STAR";
    })(SHAPE = Feuerwerk.SHAPE || (Feuerwerk.SHAPE = {}));
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
        canvas.addEventListener("click", addRocket);
        canvas.addEventListener("click", sendItem);
        window.setInterval(update, 20);
    }
    function update() {
        //Update Funktion
        requestAnimationFrame(explosionAnimation);
    }
    Feuerwerk.update = update;
    function addRocket(_event) {
        let canvas = document.querySelector("#canvas");
        // DomRect = getBoundingClientrect gibt wieder an wlecher Position das Objekt auf dem HTML ist.
        // Bzw, um genauer zu sein wo das Canvas ist. Es positioniert dieses und somit kann man die x und y Werte vom Canvas lesen
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        console.log(positionX, positionY);
        // Get Formlements
        let formData = new FormData(document.forms[0]);
        // Get Name
        let name = formData.get("Name");
        // Get Color
        let colorPicker1 = formData.get("Color1");
        //let colorPicker2: string = <string>formData.get("Color2");
        // alphaTime/Lifetime
        let lifetimeString = formData.get("Lifetime");
        let lifetime = parseInt(lifetimeString);
        // Amount
        let amountString = formData.get("Amount");
        let amount = parseInt(amountString);
        console.log(amount + " hier ist Amount");
        // Gett String from formdata
        let targetShape = formData.get("Shape");
        console.log(targetShape);
        let currentShape = targetShape;
        let currentParticle;
        //console.log(colorPicker1);
        // First color Particles
        for (let i = 0; i <= amount; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            switch (currentShape) {
                case "circle":
                    currentParticle = new Feuerwerk.Circle(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case "drop":
                    currentParticle = new Feuerwerk.Drop(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case "star":
                    currentParticle = new Feuerwerk.Star(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                default:
                    return;
            }
            particles.push(currentParticle);
        }
        // Second color Particles
        /* for (let i: number = 0; i <= amount; i++) {

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 6);

            let circle: Rocket = new Drop(position, dx, dy, lifetime, name, colorPicker2);

            particles.push(circle);

            console.log(circle);

        } */
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
    async function sendItem(_event) {
        console.log("Send to server");
        let formData = new FormData(document.forms[0]);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key); // get all elements
                json[key] = values.length > 1 ? values : values[0];
                console.log(values);
                // get all the elements in formdata
                /*let url: string = "https:webuser.hs-furtwangen.de/~nguyenki/Database/?";
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                await fetch(url + "?" + query.toString());
                alert("New added Item");
            }*/
            }
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map