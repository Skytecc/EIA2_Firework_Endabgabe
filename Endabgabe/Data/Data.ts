namespace Feuerwerk {

    // Interface von DataEntries, es ist die Liste der Rocketlisten
    export interface DataEntries {
        [category: string]: Rocket[];
    }

    //FormDataJSON - man bekommt die Keyvalues/Values von den Inputs der Formelementen
    export interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    //Funktion um die Datenbankliste anzeigen zu lassen
    export async function showSavedRockets(_data: DataEntries): Promise<void> {
        console.log(_data);

        // Neue Liste wird kreiert um die entries ID in einer seperaten Liste zu bekommen (Kannst du mit console.log(entries[x]) probieren)
        // x ist die Array stelle, falls man es überprüfen will
        let entries: any[] = [];

        // going through every key in the json.data and pushing it in the new created list - pushing in entries. Then they have the ID!
        //Typ: any = entry; // Modifying entry because Typescript is making things difficult with the types?

        for (let entry in _data.data) {

            entries.push(entry);
        }
        /* console.log("Hier ist entrie 1");
        console.log(entries[0]); */

        //Für jedes Element von entries werden ein neuer Rocket kreiert mit den jeweiligen HTMLelementen (also radio, deletebutton, Name)
        // mit entry.Name wird dann auf den Namen des jeweiligen Json Objekts zugegriffen, damit dieser Name angegeben wird

        for (let entryID of entries) {

            let entry: any = _data.data[entryID];

            let rocketList: HTMLUListElement = <HTMLUListElement>document.getElementById("list");

            //let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");

            let divRocket: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            divRocket.classList.add("divNewRocket");
            rocketList.appendChild(divRocket);

            let editButton: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            editButton.classList.add("fa-solid", "fa-pen-to-square", "editbutton");
            divRocket.appendChild(editButton);

            let newRocket: HTMLParagraphElement = document.createElement("p");
            newRocket.classList.add("name");
            divRocket.appendChild(newRocket);
            newRocket.innerHTML = entry.Name;

            let deleteButton: HTMLDivElement = document.createElement("div");
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
            newRocket.appendChild(deleteButton);

            divRocket.addEventListener("click", deleteRocket);

            /* divRocket.addEventListener("click", deleteRocket);
            deleteButton.addEventListener("click", function (): void {
                removeFromDatalist(entryID); */

            deleteButton.addEventListener("click", function (): void {
                removeFromDatalist(entryID);

                window.setInterval(function (): void {
                    window.location.reload();
                },                 500);
            });


            editButton.addEventListener("click", function (): void {
                editRocket(entry.Name, entry.Color1, entry.Color2, entry.Shape, entry.Amount, entry.Lifetime);
                removeFromDatalist(entryID);
                window.setInterval(function (): void {
                    window.location.reload();
                },                 500);
            });

            console.log(entry.Shape);

            /*    console.log("Hier ist entryID");
               console.log(entryID[12]); */
        }

    }

    export async function sendItem(): Promise<void> {
        console.log("Send to server");
        let formData: FormData = new FormData(document.forms[0]);
        let json: FormDataJSON = {};

        //Mit dem for loop werden alle Werte in der Form durchiteriert und aufgenommen, so dass man diese Eigenschaften bzw. Werte weitergeben kann
        // Anstatt, dass du formData.name hast, heißt es "key"
        //da es nicht nur durch den Wert vom Namen geht sondern von allen Werten, welche in der Form sind
        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key); // get all elements
                json[key] = values.length > 1 ? values : values[0];
                console.log(values);
            }
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Rocketlist");
        query.set("data", JSON.stringify(json));
        console.log(JSON.stringify(json));
        console.log("test");
        let url: string = "https://webuser.hs-furtwangen.de/~nguyenki/Database/?";
        let response: Response = await fetch(url + query.toString());
        console.log(response);
        console.log("data.sent");
    }

    export async function removeFromDatalist(_dataID: number): Promise<void> {

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Rocketlist");
        query.set("id", _dataID.toString());

        let url: string = "https://webuser.hs-furtwangen.de/~nguyenki/Database/?";
        let response: Response = await fetch(url + query.toString());
        console.log(response);
        console.log("delete");
        console.log(_dataID);
    }

    export function editRocket(_rocketName: string, _color1: string, _color2: string, _shape: string, _amount: string, _lifeTime: string): void {

        console.log("edit list element");
        let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");
        name.value = _rocketName;
        let color1: HTMLInputElement = <HTMLInputElement>document.querySelector("#color1");
        color1.value = _color1;
        let color2: HTMLInputElement = <HTMLInputElement>document.querySelector("#color2");
        color2.value = _color2;

        // Gett String from formdata
        let circleRadio: HTMLInputElement = <HTMLInputElement>document.getElementById("circle");
        let dropRadio: HTMLInputElement = <HTMLInputElement>document.getElementById("drop");
        let starRadio: HTMLInputElement = <HTMLInputElement>document.getElementById("star");

        console.log("hier ist edit Shape Aussage");
        console.log(_shape);

        switch (_shape) {
            case "circle":
                circleRadio.checked = true;
                break;
            case "drop":
                dropRadio.checked = true;
                break;
            case "star":
                starRadio.checked = true;
                break;
            default:
        }

        let amount: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        amount.value = _amount;
        let lifetime: HTMLInputElement = <HTMLInputElement>document.querySelector("#lifetime");
        lifetime.value = _lifeTime;

    }
}