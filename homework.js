export default class Homework {
    constructor(homework) {
    this._name = homework.name;
    //console.log(this._theme);
    this._theme = homework.theme.toUpperCase();
    this._dateHandIt = new Date (homework.dateHandIt);
    this._notes = homework.notes;
    
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

get name() {
    return this._name;
}
get theme() {
    return this._theme;
}
get dateHandIt() {
    return this._dateHandIt;
}
get notes() {
    return this._notes;
}

//Para que aparesca en la edicion de datos
_getNumberAs2Digits(number){
    if (number < 10){
    //se convierte en string
    return "0"+number;
    } 
    return number;
}
//Fechas para la edicion de estos
getDateToDoForDate(){
    //descomposicion
    let {dateHandIt} = this;
    let date = dateHandIt.getFullYear() + "-" + 
    this._getNumberAs2Digits(dateHandIt.getMonth()+1) + "-" +
    this._getNumberAs2Digits(dateHandIt.getDate());
    return date;
}
//Fecha para cumpleaños 
getDateHandItAsString() {
    let date =
    this._dateHandIt.getDate() +
    "/" +
    this._months[this._dateHandIt.getMonth()] +
    "/" +
    this._dateHandIt.getFullYear();

    return date;
}
getDaysToDo() {
    let oneDay = 24 * 60 * 60 * 1000;
    let differenceMs =  this._dateHandIt - new Date() ;
    let day = Math.trunc(differenceMs / oneDay);

    return day;
}
}