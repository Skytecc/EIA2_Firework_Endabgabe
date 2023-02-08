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
    let rockets = [];
    let coordinates = [];
    window.addEventListener("load", handleload);
    function handleload() {
        let canvas = document.querySelector("#canvas");
        // Siehe Canvas Lektion
        if (!canvas) {
            return;
        }
        Feuerwerk.crc2 = canvas.getContext("2d");
        console.log("Canvas");
        canvas.addEventListener("click", testRocket);
        window.setInterval(update, 20);
    }
    function update() {
        //Update Funktion
        for (let circle of rockets) {
            circle.draw();
            circle.update();
            rockets.forEach((circle, i) => {
                if (circle.alpha <= 0) {
                    rockets.splice(i, 1);
                }
            });
        }
    }
    function drawRocket(_event) {
        let canvas = document.querySelector("#canvas");
        //DomRect = getBoundingClientrect gibt wieder an welcher Position das Objekt ist, es auf dem HTML ist.
        //Bzw, Wo das Canvas im HTML ist. Positioniert dieses und somit kann man die x und y Werte vom Canvas lesen. 
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        console.log(positionX, positionY);
        let position = { x: positionX, y: positionY };
        //console.log(position);
        let rgba1 = Math.floor(Math.random() * 255);
        let rgba2 = Math.floor(Math.random() * 255);
        let rgba3 = Math.floor(Math.random() * 255);
        let color = "RGB" + "(" + rgba1 + "," + rgba2 + "," + rgba3 + ")";
        //rockets.push(new Circle(position, "test", color, color));
        console.log(rockets);
    }
    function testRocket(_event) {
        let canvas = document.querySelector("#canvas");
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        console.log(positionX, positionY);
        let position = { x: positionX, y: positionY };
        let dx = (Math.random() - 0.5) * (Math.random() * 6);
        let dy = (Math.random() - 0.5) * (Math.random() * 6);
        let radius = Math.random() * 3;
        let rgba1 = Math.floor(Math.random() * 255);
        let rgba2 = Math.floor(Math.random() * 255);
        let rgba3 = Math.floor(Math.random() * 255);
        let color = "RGB" + "(" + rgba1 + "," + rgba2 + "," + rgba3 + ")";
        rockets.push(new Feuerwerk.Circle(position, "test", color, color, radius, dx, dy));
        console.log(rockets);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map