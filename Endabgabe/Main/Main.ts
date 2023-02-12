/*
Aufgabe: <Endaufgabe Feuerwerk>
Name: <Cindy Nguyen>
Matrikel: <271131>
Datum: <12.02.2023>
Quellen: <Ann-Kathrin Haas>
*/

namespace Feuerwerk {

    export interface Vector {
        x: number;
        y: number;
    }
    
    let particles: Rocket[] = [];

    window.addEventListener("load", handleload);

    export let crc2: CanvasRenderingContext2D;

    async function handleload(): Promise<void> {
        
        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~nguyenki/Database/?command=find&collection=Rocketlist");
        let offer: string = await response.text();
        let dataJson: DataEntries = JSON.parse(offer);

        let canvas = <HTMLCanvasElement>document.querySelector("#canvas");

        if (!canvas) {
            return;
        }

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", createRocket);

        let addButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#addRocket");
        addButton.addEventListener("click", addRocket);

        showSavedRockets(dataJson);

        window.setInterval(update, 20);

    }

    export function update(): void {
        requestAnimationFrame(animateExplosion);
    }

    function createRocket(_event: MouseEvent): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        let rect: DOMRect = canvas.getBoundingClientRect();

        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;
        console.log(positionX, positionY);

        let formData: FormData = new FormData(document.forms[0]);

        let name: string = <string>formData.get("Name")

        let colorPicker1: string = <string>formData.get("Color1");
        let colorPicker2: string = <string>formData.get("Color2");

        let lifetimeString: string = <string>formData.get("Lifetime");
        let lifetime: number = parseInt(lifetimeString);

        let amountString: string = <string>formData.get("Amount");
        let amount: number = parseInt(amountString);

        let targetShape: string = <string>formData.get("Shape");

        let currentShape: string = <string>targetShape;

        let currentParticle: Rocket;

        for (let i: number = 0; i <= amount; i++) {

            let color: string;

            if( i < amount/2 ) {
                color = colorPicker1;
            }else {
                color = colorPicker2;
            }

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 10);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 10);

            switch(currentShape) {
                case "circle":
                    currentParticle = new Circle(position, dx, dy, lifetime, name, color);
                    break;
                case "drop":
                    currentParticle = new Drop(position, dx, dy, lifetime, name, color);
                    break;
                case "star":
                    currentParticle = new Star(position, dx, dy, lifetime, name, color);
                    break;
                default:
                return;
            }
            particles.push(currentParticle);
        }

    }

    function animateExplosion(): void {

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

    }

    function addRocket(_event: MouseEvent): void {
        let rocketList: HTMLElement = <HTMLElement>document.getElementById("list");
      
        let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");
        
        let divRocket: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        divRocket.classList.add("divNewRocket");
        rocketList.appendChild(divRocket);

        let editButton: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "editbutton");
        divRocket.appendChild(editButton);

        let newRocket: HTMLParagraphElement = document.createElement("p");
        newRocket.classList.add("name");
        divRocket.appendChild(newRocket);
        newRocket.innerHTML = name.value;

        let deleteButton: HTMLDivElement = document.createElement("div");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
        newRocket.appendChild(deleteButton);

        divRocket.addEventListener("click", deleteRocket);
        editButton.addEventListener("click",deleteRocket);

        sendItem();

        window.setInterval(function (): void {
            window.location.reload();
        },                 500);

    }

    export function deleteRocket(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let currentTarget: HTMLElement = <HTMLElement>_event.currentTarget;
        let parentElement: HTMLElement = <HTMLElement>currentTarget.parentElement;

        if (target.classList.contains("deleteButton") || target.classList.contains("trash") || target.classList.contains("editbutton")) {
            parentElement.removeChild(currentTarget);
        }
    }

}