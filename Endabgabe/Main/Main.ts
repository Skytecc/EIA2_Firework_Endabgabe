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

    export interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    export enum SHAPE {
        CIRCLE,
        DROP,
        STAR
    }

    export let currentShape: Rocket;

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

        canvas.addEventListener("click", addRocket);
        canvas.addEventListener("click", sendItem);


        window.setInterval(update, 20);

    }

    export function update(): void {
        //Update Funktion

        requestAnimationFrame(explosionAnimation);

    }

    function addRocket(_event: MouseEvent): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        // DomRect = getBoundingClientrect gibt wieder an wlecher Position das Objekt auf dem HTML ist.
        // Bzw, um genauer zu sein wo das Canvas ist. Es positioniert dieses und somit kann man die x und y Werte vom Canvas lesen
        let rect: DOMRect = canvas.getBoundingClientRect();

        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;
        console.log(positionX, positionY);

        // Get Formlements

        let formData: FormData = new FormData(document.forms[0]);

        // Get Name
        let name: string = <string>formData.get("Name")

        // Get Color
        let colorPicker1: string = <string>formData.get("Color1");
        //let colorPicker2: string = <string>formData.get("Color2");

        // alphaTime/Lifetime
        let lifetimeString: string = <string>formData.get("Lifetime");
        let lifetime: number = parseInt(lifetimeString);

        // Amount
        let amountString: string = <string>formData.get("Amount");
        let amount: number = parseInt(amountString);

        console.log(amount + " hier ist Amount");

        // Gett String from formdata

        let targetShape: string = <string>formData.get("Shape");
        console.log(targetShape);

        let currentShape: string = <string>targetShape;

        let currentParticle: Rocket;

        //console.log(colorPicker1);

        // First color Particles

        for (let i: number = 0; i <= amount; i++) {

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 6);

            switch(currentShape) {
                case "circle":
                    currentParticle = new Circle(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case "drop":
                    currentParticle = new Drop(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case "star":
                    currentParticle = new Star(position, dx, dy, lifetime, name, colorPicker1);
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


    async function sendItem(_event: MouseEvent): Promise<void> {
        console.log("Send to server");
        let formData: FormData = new FormData(document.forms[0]);
        let json: FormDataJSON = {};


        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key); // get all elements
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

}