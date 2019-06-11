export default class ButtomDelete {
    constructor() {
        this._homeDo = []
        this._homeworks = JSON.parse(localStorage.getItem("HomeworksToDo"));
    }
    _addButtonDelete(row, homework) {
        this._homeDo = this._homeworks;
        let btnDelete = document.createElement("input");
        btnDelete.type = "button";
        btnDelete.value = "Eliminar";
        btnDelete.className = "btn btn-danger";
        btnDelete.addEventListener("click", () => {
            this._deleteHomework(row, homework);
        })

        row.cells[6].innerHTML = "";
        row.cells[6].appendChild(btnDelete);
    }
    _deleteHomework(row, homework) {
        for (let i = 0; i < this._homeDo.length; i++) {
            if (homework.name === this._homeDo[i].name) {
                this._homeDo.splice(i, 1);
                break
            }
        }
        row.innerHTML = "";
        location.reload();
        localStorage.setItem("HomeworksToDo", JSON.stringify(this._homeDo));
    }
}
