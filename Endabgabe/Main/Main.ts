/*
Aufgabe: <Endaufgabe Feuerwerk>
Name: <Cindy Nguyen>
Matrikel: <271131>
Datum: <>
Quellen: <Ann-Kathrin Haas>
*/

namespace Feuerwerk {

    export interface Vector {
        x: number;
        y: number;
    }

    let canvas: HTMLCanvasElement;

    let particles: Rocket[] = [];

    window.addEventListener("load", handleload);

    export let crc2: CanvasRenderingContext2D;

    function handleload(): void {

        canvas = <HTMLCanvasElement>document.querySelector("#canvas");

        // Siehe Canvas Lektion
        if (!canvas) {
            return;
        }

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        console.log("Canvas");

        canvas.addEventListener("click", Rocket);

        window.setInterval(update, 20);

    }

    function update(): void {
        //Update Funktion

        requestAnimationFrame(explosionAnimation);

    }

    function Rocket(_event: MouseEvent): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        let rect: DOMRect = canvas.getBoundingClientRect();

        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;
        console.log(positionX, positionY);

        // Get Formelements

        let formData: FormData = new FormData(document.forms[0]);

        // Get Name
        let name: string = <string>formData.get("Name")

        // Get Color
        let colorPicker1: string = <string>formData.get("Color1")
        let colorPicker2: string = <string>formData.get("Color2")

        // alphaTime/Lifetime
        let lifetimeString: string = <string>formData.get("Lifetime");
        let lifetime: number = parseInt(lifetimeString);

        // Amount
        let amountString: string = <string>formData.get("Amount");
        let amount: number = parseInt(amountString);

        console.log(amount + " hier ist Amount");

        //console.log(colorPicker1);

        // First color Particles

        for (let i: number = 0; i <= amount; i++) {

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 6);

            let circle: Rocket = new Drop(position, dx, dy, lifetime, name, colorPicker1);

            particles.push(circle);
        }

        // Second color Particles

        for (let i: number = 0; i <= amount; i++) {

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 6);

            let circle: Rocket = new Drop(position, dx, dy, lifetime, name, colorPicker2);

            particles.push(circle);

            console.log(circle);

        }

    }

    function explosionAnimation(): void {

        // making particle Animation that it fades and splices from Array

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        crc2.clearRect(0, 0, canvas.width, canvas.height);

        for (let particle of particles) {
            if (particle.alpha <= 0) {
              let index: number = particles.indexOf(particle);
              particles.splice(index, 1);
            }
            else {
              particle.explode(); 
            }
          }

        //console.log(particles);
    }

}