"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    //Funktion um die Datenbankliste anzeigen zu lassen
    async function showSavedRockets(_data) {
        console.log(_data);
        let entries = [];
        for (let entry in _data.data) {
            entries.push(entry);
        }
        for (let entryID of entries) {
            let entry = _data.data[entryID];
            let rocketList = document.getElementById("list");
            let divRocket = document.createElement("div");
            divRocket.classList.add("divNewRocket");
            rocketList.appendChild(divRocket);
            let editButton = document.createElement("div");
            editButton.classList.add("fa-solid", "fa-pen-to-square", "editbutton");
            divRocket.appendChild(editButton);
            let newRocket = document.createElement("p");
            newRocket.classList.add("name");
            divRocket.appendChild(newRocket);
            newRocket.innerHTML = entry.Name;
            let deleteButton = document.createElement("div");
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
            newRocket.appendChild(deleteButton);
            divRocket.addEventListener("click", Feuerwerk.deleteRocket);
            // DeleteButton Event
            deleteButton.addEventListener("click", function () {
                removeFromDatalist(entryID);
                window.setInterval(function () {
                    window.location.reload();
                }, 500);
            });
            // EditButton Event
            editButton.addEventListener("click", function () {
                editRocket(entry.Name, entry.Color1, entry.Color2, entry.Shape, entry.Amount, entry.Lifetime);
                removeFromDatalist(entryID);
            });
        }
    }
    Feuerwerk.showSavedRockets = showSavedRockets;
    async function sendItem() {
        console.log("Send to server");
        let formData = new FormData(document.forms[0]);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key); // get all elements
                json[key] = values.length > 1 ? values : values[0];
                console.log(values);
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Rocketlist");
        query.set("data", JSON.stringify(json));
        console.log(JSON.stringify(json));
        console.log("test");
        let url = "https://webuser.hs-furtwangen.de/~nguyenki/Database/?";
        let response = await fetch(url + query.toString());
        console.log(response);
        console.log("data.sent");
    }
    Feuerwerk.sendItem = sendItem;
    async function removeFromDatalist(_dataID) {
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Rocketlist");
        query.set("id", _dataID.toString());
        let url = "https://webuser.hs-furtwangen.de/~nguyenki/Database/?";
        let response = await fetch(url + query.toString());
        console.log(response);
        console.log("delete");
        console.log(_dataID);
    }
    Feuerwerk.removeFromDatalist = removeFromDatalist;
    function editRocket(_rocketName, _color1, _color2, _shape, _amount, _lifeTime) {
        console.log("edit list element");
        let name = document.querySelector("#name");
        name.value = _rocketName;
        let color1 = document.querySelector("#color1");
        color1.value = _color1;
        let color2 = document.querySelector("#color2");
        color2.value = _color2;
        let circleRadio = document.getElementById("circle");
        let dropRadio = document.getElementById("drop");
        let starRadio = document.getElementById("star");
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
        let amount = document.querySelector("#amount");
        amount.value = _amount;
        let lifetime = document.querySelector("#lifetime");
        lifetime.value = _lifeTime;
    }
    Feuerwerk.editRocket = editRocket;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Data.js.map