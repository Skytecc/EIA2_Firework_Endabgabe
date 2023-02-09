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

    //let rockets: Rocket[] = [];

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
        
        let rgba1: number = Math.floor(Math.random() * 255);
        let rgba2: number = Math.floor(Math.random() * 255);
        let rgba3: number = Math.floor(Math.random() * 255);

        let color: string = "RGB" + "(" + rgba1 + "," + rgba2 + "," + rgba3 + ")";

        for (let i: number = 0; i <= 10; i++) {

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 6);
            let size: number = 5;

            //

            let circle: Rocket = new Circle(position, dx, dy, size, "testRocket", color, color);

            particles.push(circle);
        }

        console.log(particles);
    }

    function explosionAnimation(): void {

        // making particle Animation that it fades and splices from Array

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        crc2.clearRect(0, 0, canvas.width, canvas.height);

        for (let circle of particles) {
            if (circle.alpha <= 0) {
              let index: number = particles.indexOf(circle);
              particles.splice(index, 1);
            }
            else {
              circle.explode(); 
            }
          }

        //console.log(particles);
    }

}