import Homework from "./homework.js";
import Bottoms from "./bottoms.js";

export default class RegisterH{
    constructor(tableAgenda, tableInfo){
        this._tableAgenda = tableAgenda;
        this._tableInfo = tableInfo;
        //Array de las tareas 
        this._homeworks = [];
        //Contador de las tareas registradas
        this._numTareas = 0;
        //Iniciar en la tabla
        this._initToTable();
        //localStorage.removeItem("HomeworksToDo");
    }
    _initToTable(){
        let lsHomework = JSON.parse(localStorage.getItem("HomeworksToDo"));
        if (lsHomework === null){
            return;
        }
        lsHomework.forEach((hmws,index)=>{
            hmws.dateHandIt = new Date (hmws.dateHandIt);

            this._addToTheTable(new Homework(hmws));
        });
    }

}