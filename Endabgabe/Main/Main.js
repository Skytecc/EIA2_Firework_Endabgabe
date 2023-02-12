"use strict";
/*
Aufgabe: <Endaufgabe Feuerwerk>
Name: <Cindy Nguyen>
Matrikel: <271131>
Datum: <12.02.2023>
Quellen: <Ann-Kathrin Haas>
*/
var Feuerwerk;
(function (Feuerwerk) {
    let canvas;
    let particles = [];
    window.addEventListener("load", handleload);
    async function handleload() {
        let response = await fetch("https://webuser.hs-furtwangen.de/~nguyenki/Database/?command=find&collection=Rocketlist");
        let offer = await response.text();
        //console.log(offer);
        let dataJson = JSON.parse(offer);
        console.log("hier startet data.json");
        console.log(dataJson.data);
        //console.log("Response", response);
        //console.log(dataJson);
        canvas = document.querySelector("#canvas");
        // Siehe Canvas Lektion
        if (!canvas) {
            return;
        }
        Feuerwerk.crc2 = canvas.getContext("2d");
        console.log("Canvas");
        canvas.addEventListener("click", createRocket);
        let addButton = document.querySelector("#addRocket");
        addButton.addEventListener("click", addRocket);
        Feuerwerk.showSavedRockets(dataJson);
        window.setInterval(update, 20);
    }
    function update() {
        //Update Funktion
        requestAnimationFrame(animateExplosion);
    }
    Feuerwerk.update = update;
    function createRocket(_event) {
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
        let colorPicker2 = formData.get("Color2");
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
            let color;
            if (i < amount / 2) {
                color = colorPicker1;
            }
            else {
                color = colorPicker2;
            }
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 10);
            let dy = (Math.random() - 0.5) * (Math.random() * 10);
            switch (currentShape) {
                case "circle":
                    currentParticle = new Feuerwerk.Circle(position, dx, dy, lifetime, name, color);
                    break;
                case "drop":
                    currentParticle = new Feuerwerk.Drop(position, dx, dy, lifetime, name, color);
                    break;
                case "star":
                    currentParticle = new Feuerwerk.Star(position, dx, dy, lifetime, name, color);
                    break;
                default:
                    return;
            }
            particles.push(currentParticle);
        }
    }
    function animateExplosion() {
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
    function addRocket(_event) {
        let rocketList = document.getElementById("list");
        let name = document.querySelector("#name");
        let divRocket = document.createElement("div");
        divRocket.classList.add("divNewRocket");
        rocketList.appendChild(divRocket);
        let editButton = document.createElement("div");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "editbutton");
        divRocket.appendChild(editButton);
        let newRocket = document.createElement("p");
        newRocket.classList.add("name");
        divRocket.appendChild(newRocket);
        newRocket.innerHTML = name.value;
        let deleteButton = document.createElement("div");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
        newRocket.appendChild(deleteButton);
        divRocket.addEventListener("click", deleteRocket);
        editButton.addEventListener("click", deleteRocket);
        Feuerwerk.sendItem();
        window.setInterval(function () {
            window.localStorage.reload();
        }, 500);
    }
    function deleteRocket(_event) {
        let target = _event.target;
        let currentTarget = _event.currentTarget;
        let parentElement = currentTarget.parentElement;
        if (target.classList.contains("deleteButton") || target.classList.contains("trash") || target.classList.contains("editbutton")) {
            parentElement.removeChild(currentTarget);
        }
    }
    Feuerwerk.deleteRocket = deleteRocket;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map