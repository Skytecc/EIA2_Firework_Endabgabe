namespace Feuerwerk {

    export interface DataEntries {
        [category: string]: Rocket[];
    }

    export interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    //Funktion um die Datenbankliste anzeigen zu lassen
    export async function showSavedRockets(_data: DataEntries): Promise<void> {
        console.log(_data);

        let entries: any[] = [];

        for (let entry in _data.data) {

            entries.push(entry);
        }

        for (let entryID of entries) {

            let entry: any = _data.data[entryID];

            let rocketList: HTMLUListElement = <HTMLUListElement>document.getElementById("list");

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

            // DeleteButton Event
            deleteButton.addEventListener("click", function (): void {
                removeFromDatalist(entryID);

                window.setInterval(function (): void {
                    window.location.reload();
                },                 500);
            });

            // EditButton Event
            editButton.addEventListener("click", function (): void {
                editRocket(entry.Name, entry.Color1, entry.Color2, entry.Shape, entry.Amount, entry.Lifetime);
                removeFromDatalist(entryID);

            });

        }

    }

    export async function sendItem(): Promise<void> {
        console.log("Send to server");
        let formData: FormData = new FormData(document.forms[0]);
        let json: FormDataJSON = {};

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