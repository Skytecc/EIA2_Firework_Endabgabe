namespace Feuerwerk {

    export interface Rocket {
        name: string;
        shape: string;
        amount: number;

    }

    export interface DataEntries {
        [category: string]: Rocket[];
    }

    
    export interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

    export function showSavedRockets(_data: DataEntries): void {


    }

    export async function sendItem(_event: MouseEvent): Promise<void> {
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
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "insert");
            query.set("collection", "Items");
            query.set("data", JSON.stringify(json));
            console.log(JSON.stringify(json));
            console.log("test");
            let url: string = "https:webuser.hs-furtwangen.de/~nguyenki/Database/?";
            let response: Response = await fetch(url + query.toString());
            console.log(response);
            console.log("data.sent");
    

    }


}