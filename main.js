import Homework from "./homework.js";
import RegisterH from "./registerH.js";

class Main {
    constructor() {
        let agendaHmw = new RegisterH(
            document.querySelector("#agenda"),
            document.querySelector("#info")
        );

        document.querySelector("#btnAdd").addEventListener("click", () => {
            let form = document.querySelector("#form");

            if (form.checkValidity() === true) {

                let name = document.querySelector("#name").value;
                let theme = document.querySelector("#theme").value;
                let dateHand = document.querySelector("#dateHandIt").value;
                dateHand = dateHand.split("-");

                let dateHandIt = new Date(dateHand[0], dateHand[1] - 1, dateHand[2]);

                let notes = document.querySelector("#notes").value;

                let objHomeworks = {
                    name: name,
                    theme: theme,
                    dateHandIt: dateHandIt,
                    notes: notes,
                };

                let homework = new Homework(objHomeworks);

                agendaHmw.addHomeworkToDo(homework);
            }

            form.classList.add("was-validated");
        });
        let selector = document.getElementById("order");
        selector.addEventListener("change", () => {
            let selections = selector.value;
            if (selections === "Basic") {
                swal.fire({
                    type: "error",
                    title: "error",
                    text: "Choose an Option, THANK U :3"
                });
            } else {
                agendaHmw._findOrder(selections);
            }
        })
    }
}
let mainContactos = new Main();