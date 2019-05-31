export default class Homework {
    constructor(homework) {
    this._name = homework.name;
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


_getNumberAs2Digits(number){
    if (number < 10){
    //se convierte en string
    return "0"+number;
    } 
    return number;
}
//Fechas para la edicion de estos
getFechaBirthForDate(){
    //descomposicion
    let {dateHandIt} = this;
    let date = dateHandIt.getFullYear() + "-" + 
    this._getNumberAs2Digits(dateHandIt.getMonth()+1) + "-" +
    this._getNumberAs2Digits(dateHandIt.getDate());
    return date;
}
//Fecha para cumpleaños 
getFechaBirthAsString() {
    let date =
    this._dateHandIt.getDate() +
    "/" +
    this._months[this._dateHandIt.getMonth()] +
    "/" +
    this._dateHandIt.getFullYear();

    return date;
}
getAge() {
    let oneDay = 24 * 60 * 60 * 1000;
    let oneYear = oneDay * 365;
    let differenceMs = new Date() - this._dateHandIt;
    let age = Math.trunc(differenceMs / oneYear);

    return age;
}
}