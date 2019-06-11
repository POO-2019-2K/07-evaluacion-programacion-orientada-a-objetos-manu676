import Homework from "./homework.js";
import ButtomDelete from "./buttomDel.js";
import ButtomEdit from "./butttomEdi.js";

export default class RegisterH {
    constructor(tableAgenda, tableInfo) {
        this._tableAgenda = tableAgenda;
        this._tableInfo = tableInfo;
        //Array de las tareas 
        this._homeworks = [];
        //Contador de las tareas registradas
        this._numHomeworks = 0;
        //localStorage.removeItem("HomeworksToDo");
        //Iniciar en la tabla
        this._initToTable();

    }
    //Iniciar el listado de las tareas
    _initToTable() {
        let lsHomework = JSON.parse(localStorage.getItem("HomeworksToDo"));
        if (lsHomework === null) {
            return;
        }
        lsHomework.forEach((hmws, index) => {
            hmws.dateHandIt = new Date(hmws.dateHandIt);
            this._addToTheTable(new Homework(hmws));
        });
    }
    //Busca el orden elegido
    _findOrder(selections) {
        if (selections === "orderName") {
            this.orderName();
        }
        if (selections === "orderDateToDo") {
            this.orderDaysToDo();
        } else if (selections === "orderTheme") {
            this.orderThemes();
        }
    }
    //Ordenamiento por los dias a entregar
    orderDaysToDo() {
        let newOrder = [];
        newOrder = this._homeworks.slice(-this._numHomeworks);
        newOrder = newOrder.sort(function (a, b) {
            return a.age - b.age;
        })

        localStorage.setItem("HomeworksToDo", JSON.stringify(newOrder));
        this._deleteTable();
        this._initToTable();
        location.reload();
    }
    //Ordenamiento por materias
    orderThemes() {
        let newOrder = [];
        newOrder = this._homeworks.slice(-this._numHomeworks);
        newOrder = newOrder.sort(function (a, b) {
            if (a.theme < b.theme) {
                return -1;
            }
            if (a.theme > b.theme) {
                return 1;
            }
            return 0;
        })
        //Save in local Storange
        localStorage.setItem("HomeworksToDo", JSON.stringify(newOrder));
        this._deleteTable();
        this._initToTable();
        location.reload();
    }
    //Ordenamiento por nombres de tareas
    orderName() {
        let newOrder = [];
        newOrder = this._homeworks.slice(-this._numHomeworks);
        newOrder = newOrder.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        //Save in local Storange
        localStorage.setItem("HomeworksToDo", JSON.stringify(newOrder));
        this._deleteTable();
        this._initToTable();
        location.reload();
    }
    //Elimina la tabla y la renueva (evitar duplicado)
    _deleteTable() {
        let table;
        for (table = this._numHomeworks; table > 0; table--) {
            this._tableAgenda.deleteRow(table);
        }
        this._numHomeworks = 0;
    }
    _objetHomework(homework) {
        //objeto de LocalStorage("HomeworksToDo")
        let objHomeworks = {
            name: homework.name,
            theme: homework.theme,
            dateHandIt: homework.dateHandIt,
            age: homework.getDaysToDo(),
            notes: homework.notes
        };
        this._homeworks.push(objHomeworks);
    }
    //Contador de las tareas totales
    _counterHomeworks() {
        this._tableInfo.rows[0].cells[1].innerHTML = this._numHomeworks;
    }
    //añadir a la tabla 
    _addToTheTable(homework) {
        let row = this._tableAgenda.insertRow(-1);
        //tabla grande
        let cellName = row.insertCell(0);
        let cellTheme = row.insertCell(1);
        let cellDateHandIt = row.insertCell(2);
        let cellEdad = row.insertCell(3);
        let cellNotes = row.insertCell(4);
        row.insertCell(5);
        row.insertCell(6);

        cellName.innerHTML = homework.name;
        cellTheme.innerHTML = homework.theme;
        cellDateHandIt.innerHTML = homework.getDateHandItAsString();
        cellEdad.innerHTML = homework.getDaysToDo();
        cellNotes.innerHTML = homework.notes;

        let buttomDelete = new ButtomDelete(homework);
        buttomDelete._addButtonDelete(row, homework);
        let buttomEdit = new ButtomEdit(homework);
        buttomEdit._addButtomEdit(row, homework);
        //tabla pequeña
        this._numHomeworks++;
        this._counterHomeworks();

        this._objetHomework(homework);
    }
    //encontrar tarea para evitar no poner la misma
    _findHomework(name) {
        let findIt = -1
        //hmws = homeworks
        this._homeworks.forEach((hmws, index) => {
            if (hmws.name === name) {
                findIt = index;
                return;
            }
        });
        return findIt;
    }
    //Añadir a las tareas (A la Tabla)
    addHomeworkToDo(homework) {
        let encontrar = this._findHomework(homework.name);
        if (encontrar >= 0) {
            swal.fire({
                type: "error",
                title: "error",
                text: "Esa tarea ya esta registrada"
            });
            return;
        } else location.reload();
        //Duplica aqui this.orderDaysToDo();
        this._addToTheTable(homework);
        this.orderDaysToDo(localStorage.setItem("HomeworksToDo", JSON.stringify(this._homeworks)));
    }
}