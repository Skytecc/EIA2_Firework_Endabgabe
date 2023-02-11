"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    function showSavedRockets(_data) {
    }
    Feuerwerk.showSavedRockets = showSavedRockets;
    async function sendItem(_event) {
        console.log("Send to server");
        let formData = new FormData(document.forms[0]);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key); // get all elements
                json[key] = values.length > 1 ? values : values[0];
                console.log(values);
                // get all the elements in formdata
                /*let url: string = "https:webuser.hs-furtwangen.de/~nguyenki/Database/?";
                let query: URLSearchParams = new URLSearchParams(<any>formData);
                await fetch(url + "?" + query.toString());
                alert("New added Item");
            }*/
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Items");
        query.set("data", JSON.stringify(json));
        console.log(JSON.stringify(json));
        console.log("test");
        let url = "https:webuser.hs-furtwangen.de/~nguyenki/Database/?";
        let response = await fetch(url + query.toString());
        console.log(response);
        console.log("data.sent");
    }
    Feuerwerk.sendItem = sendItem;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Data.js.map