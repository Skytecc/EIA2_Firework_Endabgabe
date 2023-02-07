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

    let rockets: Rocket[] = [];

    let coordinates: [] = [];

    window.addEventListener("load", handleload);

    export let crc2: CanvasRenderingContext2D;

    function handleload(): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        // Siehe Canvas Lektion
        if (!canvas) {
            return;
        }

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        console.log("Canvas");

        canvas.addEventListener("click", drawRocket);

        window.setInterval(update, 20);
        
    }

    function update(): void {
        //Update Funktion

        for (let circle of rockets) {
            circle.draw;
        }

    } 


    function drawRocket(_event: MouseEvent): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        //DomRect = getBoundingClientrect gibt wieder an welcher Position das Objekt ist, es auf dem HTML ist.
        //Bzw, Wo das Canvas im HTML ist. Positioniert dieses und somit kann man die x und y Werte vom Canvas lesen. 
        let rect: DOMRect = canvas.getBoundingClientRect();

        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;
        console.log(positionX, positionY);


        let position: Vector = {x: positionX, y: positionY};

        //console.log(position);

        let rgba1: number = Math.floor(Math.random() * 255);
        let rgba2: number = Math.floor(Math.random() * 255);
        let rgba3: number = Math.floor(Math.random() * 255);

        let color: string = "RGB" + "(" + rgba1 + "," + rgba2 + "," + rgba3 + ")";

        rockets.push(new Circle(position, "test", color, color));

        console.log(rockets);
        
    }


}