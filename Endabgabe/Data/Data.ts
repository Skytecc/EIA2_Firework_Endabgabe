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
    export function showSavedRockets(_data: DataEntries): void {

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

            let radiobutton: HTMLButtonElement = <HTMLButtonElement>document.createElement("input");
            radiobutton.classList.add("radiobutton");
            radiobutton.type = "radio";
            radiobutton.name = "Rocket";
            divRocket.appendChild(radiobutton);

            let newRocket: HTMLParagraphElement = document.createElement("p");
            newRocket.classList.add("name");
            divRocket.appendChild(newRocket);
            newRocket.innerHTML = entry.Name;

            let deleteButton: HTMLDivElement = document.createElement("div");
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
            newRocket.appendChild(deleteButton);

            divRocket.addEventListener("click", deleteRocket);
            deleteButton.addEventListener("click", function (): void {
                removeFromDatalist(entryID);
            });

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
        let url: string = "https:webuser.hs-furtwangen.de/~nguyenki/Database/?";
        let response: Response = await fetch(url + query.toString());
        console.log(response);
        console.log("data.sent");
    }

    export async function removeFromDatalist(_dataID: number): Promise<void> {

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Rocketlist");
        query.set("id", _dataID.toString());

        let url: string = "https:webuser.hs-furtwangen.de/~nguyenki/Database/?";
        let response: Response = await fetch(url + query.toString());
        console.log(response);
        console.log("delete");
        console.log(_dataID);

    }


}