var schedule = {"lundi" : {8 : "toto", 10: "titi"}, "mercredi" : {11: "tata"}}; // temporary

var schedule_bis = {"jeudi" : {16 : "test"}}; // temporary

var days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
var currentClass = "4A";

const empty_note_obj = {startDate: "", startTime: "", endDate: "", endTime: "", desc : ""}

const dbKeywordsDict = {id : "id", date_start : "startDate", date_end : "endDate", h_start : "startTime", h_end : "endTime", id_teacher : "teacherId"};

const toFrenchDay = {monday: "lundi", tuesday: "mardi", wednesday: "mercredi", thursday: "jeudi", friday : "vendredi"};