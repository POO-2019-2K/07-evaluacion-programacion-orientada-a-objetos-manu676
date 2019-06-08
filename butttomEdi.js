import Homework from "./homework.js";
import ButtomDelete from "./buttomDel.js"

export default class ButtomEdit{
    constructor(){
        this._homeDo = []
        this._homeworks = JSON.parse(localStorage.getItem("HomeworksToDo"));
        this._months = [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"
        ];
    }
    _addButtomEdit(row, homework){
    this._homeDo = this._homeworks;
    let btnEdit = document.createElement("input");
    btnEdit.type = "button";
    btnEdit.value = "Editar";
    btnEdit.className = "btn btn-success";
    //llamar a un metodo 
    btnEdit.addEventListener("click", ()=>{
        this._editRow(row, homework);
    })
    
    row.cells[5].innerHTML = "";
    row.cells[5].appendChild(btnEdit);
    }
    _editRow(row,homework){
    console.log(homework);
    //Nombre new
    let iName = document.createElement("input");
    iName.type= "text";
    iName.value= homework.name;
    row.cells[0].innerHTML= "";
    row.cells[0].appendChild(iName);
    //theme new
    let iTheme = document.createElement("input");
    iTheme.type="text";
    iTheme.value= homework.theme;
    row.cells[1].innerHTML="";
    row.cells[1].appendChild(iTheme);
    //New Date to Do
    let iDateToDo = document.createElement("input");
    iDateToDo.type="date";
    iDateToDo.value= homework.getDateToDoForDate();
    row.cells[2].innerHTML="";
    row.cells[2].appendChild(iDateToDo);
    //Nota nueva
    let iNotes = document.createElement("input");
    iNotes.type="text";
    iNotes.value= homework.notes;
    row.cells[4].innerHTML="";
    row.cells[4].appendChild(iNotes);
    var inputs = {
        iName : iName,
        iTheme : iTheme,
        iDateToDo : iDateToDo,
        iNotes : iNotes
    }
    //evento de guardar
    this._buttomsCancelSave(row,homework,inputs);
    }   
    /*getDateAsString(fecha) {
    let date = fecha.getDate() +
    "/" +
    this._months[fecha.getMonth()] +
    "/" +
    fecha.getFullYear();

    return date;
    }*/
    
    _buttomsCancelSave(row,homework,inputs){    
    let btnSave= document.createElement("input");
    btnSave.type = "button";
    btnSave.value = "Grabar";
    btnSave.className= "btn btn-success"
    row.cells[5].innerHTML="";
    row.cells[5].appendChild(btnSave);
    btnSave.addEventListener("click",()=>{
        let iName = inputs.iName;
        let iTheme = inputs.iTheme;
        let iDateToDo = inputs.iDateToDo;
        //console.log(iName); 
        //console.log(iDateToDo);
        //console.log(dateString);
        let iNotes = inputs.iNotes;

        let newHomework = {
        name : iName.value,
        theme :iTheme.value,
        dateHandIt : iDateToDo.value,
        notes : iNotes.value
        };
        console.log(newHomework);
        this._saveEdit(row,homework,newHomework)
    })
    //crear boton de cancelar
    let btnCancel= document.createElement("input");
    btnCancel.type = "button";
    btnCancel.value = "Cancelar";
    btnCancel.className= "btn btn-danger"
    row.cells[6].innerHTML="";
    row.cells[6].appendChild(btnCancel);
    //evento de cancelar
    btnCancel.addEventListener("click", () =>{
        this._cancelEdit(row, homework);
    })
    }
    _saveEdit(row, homework, newHomework){
        //Buscar su ubicación 
        let newDate = newHomework.dateHandIt;
        let pos = this._findHomework(homework.name);
        console.log(newDate);
        let dateString = newDate.split("-");
        newDate = new Date(dateString[0], dateString[1], dateString[2]);
        console.log(dateString);
        //new Date(newDate);
        //dateString = dateString.getDateHandItAsString(row,homework);
        //this.getDateAsString(dateString);
        //dateString.getDateHandItAsString()
        this._homeworks[pos] = newHomework;
        localStorage.setItem("HomeworksToDo", JSON.stringify(this._homeworks));
        //location.reload();
        this._cancelEdit(row, new Homework(newHomework));
    }
    _cancelEdit(row, homework){  
        row.cells[0].innerHTML = homework.name;
        row.cells[1].innerHTML= homework.theme;
        row.cells[2].innerHTML= homework.getDateHandItAsString();
        row.cells[4].innerHTML = homework.notes;
        row.cells[5].innerHTML = "";
        row.cells[6].innerHTML = "";

        let buttomDelete = new ButtomDelete(homework);
        buttomDelete._addButtonDelete(row, homework);
        let buttomEdit = new ButtomEdit(homework);
        buttomEdit._addButtomEdit(row,homework);
    }
    _findHomework(name){
        let findIt = -1
        //hmws = homeworks
        this._homeworks.forEach((hmws,index) =>{
            if(hmws.name === name){
                findIt = index;
                return;
            }
        });
        return findIt;
    }

}
